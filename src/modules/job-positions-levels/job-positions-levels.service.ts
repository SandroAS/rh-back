// src/job-positions-levels/job-positions-levels.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async createWithAccountId(dto: CreateJobPositionsLevelDto, accountId: number): Promise<JobPositionsLevel> {
    return await super.create({ ...dto, account_id: accountId });
  }

  async findAllWithAccountId(accountId: number): Promise<JobPositionsLevel[]> {
    return await super.findAll({ where: { account_id: accountId } });
  }

  async findAndPaginateWithAccountId(pagination: PaginationDto, accountId: number): Promise<any> {
    const searchColumns = ['name'];
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

  async updateWithAccountId(uuid: string, dto: UpdateJobPositionsLevelDto, accountId: number): Promise<JobPositionsLevel> {
    return await super.updateByUuid(uuid, dto, accountId);
  }

  async removeWithAccountId(uuid: string, accountId: number): Promise<void> {
    await super.removeByUuid(uuid, accountId);
  }
}
