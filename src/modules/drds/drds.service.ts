import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { DRD } from '@/entities/drd.entity'; 
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { CreateDRDDto } from './dtos/create-drd.dto';
import { JobPositionService } from '../job-positions/job-positions.service';
import { DrdMetricsService } from '../drd-metrics/drd-metrics.service';
import { DrdTopicsService } from '../drd-topics/drd-topics.service';
import { DrdLevelsService } from '../drd-levels/drd-levels.service';
import { DRDLevel } from '@/entities/drd-level.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Injectable()
export class DrdsService extends BaseService<DRD> {
  constructor(
    @InjectRepository(DRD)
    private drdRepository: Repository<DRD>,
    private dataSource: DataSource,
    private jobPositionsService: JobPositionService,
    private drdMetricsService: DrdMetricsService,
    private drdTopicsService: DrdTopicsService,
    private drdLevelsService: DrdLevelsService,
  ) {
    super(drdRepository);
  }

  async createByAccountId(
    createDrdDto: CreateDRDDto,
    accountId: number,
    createdByUserId: number,
  ): Promise<DRD> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const jobPosition = await this.jobPositionsService.findOneWithAccountId(
        createDrdDto.job_position_uuid, 
        accountId,
        queryRunner.manager,
      );

      if (!jobPosition) {
        throw new NotFoundException(`Cargo com UUID ${createDrdDto.job_position_uuid} não encontrado na sua conta ao tentar criar um DRD.`);
      }

      const newDrdData = this.drdRepository.create({
        account_id: accountId,
        created_by_user_id: createdByUserId,
        job_position_id: jobPosition.id,
        rate: createDrdDto.rate,
      });
      const savedDrd = await queryRunner.manager.save(DRD, newDrdData);
      const drdId = savedDrd.id;

      const savedLevels = await this.drdLevelsService.createManyInTransaction(
        drdId, 
        createDrdDto.levels,
        queryRunner.manager,
      ) as DRDLevel[];
      
      const levelMap = new Map<number, number>();
      savedLevels.forEach(lvl => levelMap.set(lvl.order, lvl.id));

      await this.drdTopicsService.createTopicsAndItemsInTransaction(
        drdId, 
        createDrdDto.topics,
        levelMap,
        queryRunner.manager,
      );

      await this.drdMetricsService.createMetricsAndMinScoresInTransaction(
        drdId, 
        createDrdDto.metrics, 
        levelMap,
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();
      return savedDrd;

    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err instanceof QueryFailedError) {
        if ((err as any).code === 'ER_DUP_ENTRY') { 
          throw new ConflictException(
            'Já existe um DRD cadastrado para este cargo. Um cargo só pode ter um DRD ativo.'
          );
        }
      }

      if (err instanceof NotFoundException) {
        throw err;
      }
      console.error('Erro ao criar DRD:', err);
      throw new InternalServerErrorException('Falha ao salvar o descritivo de resultado e desempenho.');
    } finally {
      await queryRunner.release();
    }
  }

  async findOneByUuid(uuid: string, accountId: number): Promise<DRD> {
    const drd = await this.drdRepository.findOne({ where: { uuid: uuid, account_id: accountId } });

    if (!drd) {
      throw new NotFoundException(`DRD com UUID "${uuid}" não encontrado na sua conta.`);
    }

    return drd;
  }

  async findAndPaginateByAccountId(pagination: PaginationDto, accountId: number, searchColumns: string[] = []): Promise<PaginationResult<DRD>> {
    return super.findAndPaginate(pagination, searchColumns, (qb) => {
        qb.andWhere('entity.account_id = :accountId', { accountId });
    });
  }
}