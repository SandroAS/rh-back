import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { JobPositionsLevel } from '@/entities/job-position-level.entity';
import { CreateJobPositionsLevelDto } from './dtos/create-job-positions-level.dto';
import { UpdateJobPositionsLevelDto } from './dtos/update-job-positions-level.dto';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Injectable()
export class JobPositionsLevelsService extends BaseService<JobPositionsLevel> {
  constructor(
    @InjectRepository(JobPositionsLevel)
    protected readonly repository: Repository<JobPositionsLevel>,
  ) {
    super(repository);
  }

  async createWithAccountId(dto: CreateJobPositionsLevelDto, accountId: number, manager?: EntityManager): Promise<JobPositionsLevel> {
    if(manager) {
      const jobPositionLevelsRepository = manager.getRepository(JobPositionsLevel);
      const newEntity = jobPositionLevelsRepository.create({ ...dto, account_id: accountId });
      return await jobPositionLevelsRepository.save(newEntity);
    }

    return await super.create({ ...dto, account_id: accountId });
  }

  async findAllWithAccountId(accountId: number): Promise<JobPositionsLevel[]> {
    return await super.findAll({ where: { account_id: accountId } });
  }

  async findAndPaginateWithAccountId(pagination: PaginationDto, accountId: number): Promise<any> {
    const searchColumns = ['name', 'salary'];
    return await super.findAndPaginate(
      pagination,
      searchColumns,
      (qb) => {
        qb.andWhere('entity.account_id = :accountId', { accountId });
      }
    );
  }

  async findOneWithAccountId(uuid: string, accountId: number): Promise<JobPositionsLevel> {
    const level = await super.findOne({ where: { uuid, account_id: accountId } });
    if (!level) {
      throw new NotFoundException(`Job position level with UUID "${uuid}" not found.`);
    }
    return level;
  }

  async updateWithAccountId(uuid: string, dto: UpdateJobPositionsLevelDto, accountId: number, manager?: EntityManager): Promise<JobPositionsLevel> {
    if(manager) {
      const jobPositionLevelsRepository = manager.getRepository(JobPositionsLevel);

      const whereClause: any = { uuid: uuid };
      if (accountId) {
        whereClause.account_id = accountId;
      }

      const entity = await jobPositionLevelsRepository.findOne({ where: whereClause });
      if (!entity) {
        throw new NotFoundException(`Nível de cargo com UUID "${uuid}" não encontrada ao tentar atualizar.`);
      }

      Object.assign(entity, dto);
      return await jobPositionLevelsRepository.save(entity);
    }

    return await super.updateByUuid(uuid, dto, accountId);
  }

  async removeWithAccountId(uuid: string, accountId: number, manager?: EntityManager): Promise<void> {
    if(manager) {
      const jobPositionLevelsRepository = manager.getRepository(JobPositionsLevel);

      const whereClause: any = { uuid: uuid };
      if (accountId) {
        whereClause.account_id = accountId;
      }

      const result = await jobPositionLevelsRepository.delete(whereClause);
      if (result.affected === 0) {
        throw new NotFoundException(`Nível de cargo com UUID "${uuid}" não encontrado ao tentar deletar.`);
      }
    } else {
      await super.removeByUuid(uuid, accountId);
    }
  }
}
