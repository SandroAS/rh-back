import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { JobPosition } from '@/entities/job-position.entity';
import { CreateJobPositionDto } from './dtos/create-job-position.dto';
import { UpdateJobPositionDto } from './dtos/update-job-position.dto';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Injectable()
export class JobPositionService extends BaseService<JobPosition> {
  constructor(
    @InjectRepository(JobPosition)
    private readonly jobPositionRepository: Repository<JobPosition>,
  ) {
    super(jobPositionRepository);
  }

  async createWithAccountId(createJobPositionDto: CreateJobPositionDto, accountId: number): Promise<JobPosition> {
    return await super.create({ ...createJobPositionDto, account_id: accountId });
  }

  async findAllWithAccountId(accountId: number): Promise<JobPosition[]> {
    return await super.findAll({ where: { account_id: accountId } });
  }

  async findAndPaginateWithAccountId(pagination: PaginationDto, accountId: number): Promise<any> {
    const searchColumns = ['title', 'description', 'cbo_code', 'base_salary'];
    return await super.findAndPaginate(
      pagination,
      searchColumns,
      (qb) => {
        qb.andWhere('entity.account_id = :accountId', { accountId });
      }
    );
  }

  async findOneWithAccountId(uuid: string, accountId: number, manager?: EntityManager): Promise<JobPosition> {
    if(manager) {
      const jobPositionRepo = manager.getRepository(JobPosition);
      return await jobPositionRepo.findOne({ where: { uuid } });
    }

    const jobPosition = await super.findOne({ where: { uuid, account_id: accountId } });
    if (!jobPosition) {
      throw new NotFoundException(`Cargo com UUID "${uuid}" não encontrado para esta conta.`);
    }
    return jobPosition;
  }

  async updateWithAccountId(uuid: string, updateJobPositionDto: UpdateJobPositionDto, accountId: number): Promise<JobPosition> {
    return await super.updateByUuid(uuid, updateJobPositionDto, accountId);
  }

  async removeWithAccountId(uuid: string, accountId: number): Promise<void> {
    await super.removeByUuid(uuid, accountId);
  }
}
