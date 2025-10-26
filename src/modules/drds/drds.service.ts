import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsRelations, QueryFailedError, Repository } from 'typeorm';
import { DRD } from '@/entities/drd.entity'; 
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { CreateDRDDto } from './dtos/create-drd.dto';
import { JobPositionService } from '../job-positions/job-positions.service';
import { DrdMetricsService } from '../drd-metrics/drd-metrics.service';
import { DrdTopicsService } from '../drd-topics/drd-topics.service';
import { DrdLevelsService } from '../drd-levels/drd-levels.service';
import { DRDLevel } from '@/entities/drd-level.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { User } from '@/entities/user.entity';
import { UpdateDRDDto } from './dtos/update-drd.dto';

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
    createdByUser: User,
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
        created_by_user_id: createdByUser.id,
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

      savedDrd.jobPosition = jobPosition;
      savedDrd.createdBy = createdByUser;

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
      qb.leftJoinAndSelect('entity.createdBy', 'createdBy');
      qb.leftJoin('entity.jobPosition', 'jobPosition');
      qb.select([
        'entity.uuid',
        'entity.id',
        'entity.rate',
        'entity.job_position_id',
        'entity.account_id',
        'entity.created_at',
        'entity.updated_at',
        'createdBy.uuid',
        'createdBy.name',
        'createdBy.email',
        'createdBy.profile_img_url',
        'jobPosition.uuid',
        'jobPosition.title',
      ]);
    });
  }

  async updateByAccountId(
    uuid: string, 
    updateDrdDto: UpdateDRDDto, 
    accountId: number, 
    createdByUser: User
  ): Promise<DRD> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
    try {
      const existingDrd = await this.drdRepository.findOne({
        where: { uuid, account_id: accountId },
        relations: [
          'jobPosition',
          'levels',
          'metrics.minScores',
          'topics.drdTopicItems.minScores',
        ],
      });

      if (!existingDrd) {
        throw new NotFoundException(`DRD com UUID ${uuid} não encontrado na sua conta ao tentar atualizar DRD.`);
      }

      const jobPosition = await this.jobPositionsService.findOneWithAccountId(
        updateDrdDto.job_position_uuid, 
        accountId,
        queryRunner.manager,
      );

      if (!jobPosition) {
        throw new NotFoundException(`Cargo com UUID ${updateDrdDto.job_position_uuid} não encontrado ao tentar atualizar DRD.`);
      }

      if (existingDrd.jobPosition.uuid !== updateDrdDto.job_position_uuid) {
        const otherDrd = await queryRunner.manager.findOne(DRD, {
          where: { job_position_id: jobPosition.id, account_id: accountId }
        });

        if (otherDrd && otherDrd.uuid !== existingDrd.uuid) {
          throw new ConflictException(
            'Já existe outro DRD cadastrado para este cargo. Um cargo só pode ter um DRD ativo.'
          );
        }
      }

      const drdUpdateData = {
        job_position_id: jobPosition.id,
        rate: updateDrdDto.rate,
        updated_by_user_id: createdByUser.id,
      };

      queryRunner.manager.merge(DRD, existingDrd, drdUpdateData);
      const updatedDrd = await queryRunner.manager.save(DRD, existingDrd);

      const drdId = updatedDrd.id;

      const updatedLevels: DRDLevel[] = await this.drdLevelsService.syncLevelsInTransaction(
        drdId, 
        updateDrdDto.levels, 
        existingDrd.levels,
        queryRunner.manager
      ) as DRDLevel[];

      const levelMap = new Map<number, { id: number, uuid: string }>();
      updatedLevels.forEach(lvl => levelMap.set(lvl.order, { id: lvl.id, uuid: lvl.uuid }));

      const updatedTopics = await this.drdTopicsService.syncTopicsAndItemsInTransaction(
        drdId,
        updateDrdDto.topics,
        existingDrd.topics,
        levelMap,
        queryRunner.manager,
      );

      const updateMetrics = await this.drdMetricsService.syncMetricsAndMinScoresInTransaction(
        drdId,
        updateDrdDto.metrics,
        existingDrd.metrics,
        levelMap,
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();

      updatedDrd.jobPosition = jobPosition;
      updatedDrd.createdBy = createdByUser;
      updatedDrd.levels = updatedLevels;
      updatedDrd.topics = updatedTopics;
      updatedDrd.metrics = updateMetrics;

      return updatedDrd;

    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }
      if (err instanceof QueryFailedError && (err as any).code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Erro de dados duplicados ao atualizar DRD.');
      }

      console.error('Erro ao atualizar DRD:', err);
      throw new InternalServerErrorException('Falha ao concluir a atualização do DRD.');
    } finally {
      await queryRunner.release();
    }
  }
}