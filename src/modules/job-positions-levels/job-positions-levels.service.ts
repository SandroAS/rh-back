import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPositionsLevel } from '@/entities/job-position-level.entity';
import { CreateJobPositionsLevelDto } from './dtos/create-job-positions-level.dto';
import { UpdateJobPositionsLevelDto } from './dtos/update-job-positions-level.dto';


@Injectable()
export class JobPositionsLevelsService {
  constructor(
    @InjectRepository(JobPositionsLevel)
    private readonly repository: Repository<JobPositionsLevel>,
  ) {}

  async create(dto: CreateJobPositionsLevelDto, accountId: number): Promise<JobPositionsLevel> {
    const newLevel = this.repository.create({ ...dto, account_id: accountId });
    return this.repository.save(newLevel);
  }

  async findAll(accountId: number): Promise<JobPositionsLevel[]> {
    return this.repository.find({ where: { account_id: accountId } });
  }

  async findOne(uuid: string, accountId: number): Promise<JobPositionsLevel> {
    const level = await this.repository.findOne({ where: { uuid, account_id: accountId } });
    if (!level) {
      throw new NotFoundException(`Job position level with UUID "${uuid}" not found.`);
    }
    return level;
  }

  async update(uuid: string, dto: UpdateJobPositionsLevelDto, accountId: number): Promise<JobPositionsLevel> {
    const level = await this.repository.findOne({ where: { uuid, account_id: accountId } });
    if (!level) {
      throw new NotFoundException(`Job position level with UUID "${uuid}" not found.`);
    }
    this.repository.merge(level, dto);
    return this.repository.save(level);
  }

  async remove(uuid: string, accountId: number): Promise<void> {
    const result = await this.repository.delete({ uuid, account_id: accountId });
    if (result.affected === 0) {
      throw new NotFoundException(`Job position level with UUID "${uuid}" not found.`);
    }
  }
}
