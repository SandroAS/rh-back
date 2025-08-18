import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';
import { CreateJobPositionsLevelsGroupDto } from './dtos/create-job-positions-levels-group.dto';
import { UpdateJobPositionsLevelsGroupDto } from './dtos/update-job-positions-levels-group.dto';

@Injectable()
export class JobPositionsLevelsGroupsService {
  constructor(
    @InjectRepository(JobPositionsLevelsGroup)
    private readonly repository: Repository<JobPositionsLevelsGroup>,
  ) {}

  async create(dto: CreateJobPositionsLevelsGroupDto, accountId: number): Promise<JobPositionsLevelsGroup> {
    const newGroup = this.repository.create({ ...dto, account_id: accountId });
    return this.repository.save(newGroup);
  }

  async findAll(accountId: number): Promise<JobPositionsLevelsGroup[]> {
    return this.repository.find({ where: { account_id: accountId } });
  }

  async findOne(uuid: string, accountId: number): Promise<JobPositionsLevelsGroup> {
    const group = await this.repository.findOne({ where: { uuid, account_id: accountId } });
    if (!group) {
      throw new NotFoundException(`Job positions level group with UUID "${uuid}" not found.`);
    }
    return group;
  }

  async update(uuid: string, dto: UpdateJobPositionsLevelsGroupDto, accountId: number): Promise<JobPositionsLevelsGroup> {
    const group = await this.repository.findOne({ where: { uuid, account_id: accountId } });
    if (!group) {
      throw new NotFoundException(`Job positions level group with UUID "${uuid}" not found.`);
    }
    this.repository.merge(group, dto);
    return this.repository.save(group);
  }

  async remove(uuid: string, accountId: number): Promise<void> {
    const result = await this.repository.delete({ uuid, account_id: accountId });
    if (result.affected === 0) {
      throw new NotFoundException(`Job positions level group with UUID "${uuid}" not found.`);
    }
  }
}
