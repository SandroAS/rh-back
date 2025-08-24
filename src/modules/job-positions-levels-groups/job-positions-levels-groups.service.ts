import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';
import { CreateJobPositionsLevelsGroupDto } from './dtos/create-job-positions-levels-group.dto';
import { UpdateJobPositionsLevelsGroupDto } from './dtos/update-job-positions-levels-group.dto';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Injectable()
export class JobPositionsLevelsGroupsService extends BaseService<JobPositionsLevelsGroup> {
  constructor(
    @InjectRepository(JobPositionsLevelsGroup)
    protected readonly repository: Repository<JobPositionsLevelsGroup>
  ) {
    super(repository);
  }

  async createWithAccountId(dto: CreateJobPositionsLevelsGroupDto, accountId: number): Promise<JobPositionsLevelsGroup> {
    return await super.create({ ...dto, account_id: accountId });
  }

  async findAllWithAccountId(accountId: number): Promise<JobPositionsLevelsGroup[]> {
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

  async findOneWithAccountId(uuid: string, accountId: number): Promise<JobPositionsLevelsGroup> {
    const group = await super.findOne({ where: { uuid, account_id: accountId } });
    if (!group) {
      throw new NotFoundException(`Job positions level group with UUID "${uuid}" not found.`);
    }
    return group;
  }

  async updateWithAccountId(uuid: string, dto: UpdateJobPositionsLevelsGroupDto, accountId: number): Promise<JobPositionsLevelsGroup> {
    return await super.updateByUuid(uuid, dto, accountId);
  }

  async removeWithAccountId(uuid: string, accountId: number): Promise<void> {
    await super.removeByUuid(uuid, accountId);
  }
}
