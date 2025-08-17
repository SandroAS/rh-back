import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosition } from '@/entities/job-position.entity';
import { CreateJobPositionDto } from './dtos/create-job-position.dto';
import { UpdateJobPositionDto } from './dtos/update-job-position.dto';

@Injectable()
export class JobPositionService {
  constructor(
    @InjectRepository(JobPosition)
    private readonly jobPositionRepository: Repository<JobPosition>,
  ) {}

  async create(createJobPositionDto: CreateJobPositionDto, accountId: number): Promise<JobPosition> {
    const jobPosition = this.jobPositionRepository.create({
      ...createJobPositionDto,
      account_id: accountId,
    });
    return this.jobPositionRepository.save(jobPosition);
  }

  async findAll(accountId: number): Promise<JobPosition[]> {
    return this.jobPositionRepository.find({ where: { account_id: accountId } });
  }

  async findOne(uuid: string, accountId: number): Promise<JobPosition> {
    const jobPosition = await this.jobPositionRepository.findOne({ where: { uuid, account_id: accountId } });
    return jobPosition;
  }

  async update(uuid: string, updateJobPositionDto: UpdateJobPositionDto, accountId: number): Promise<JobPosition> {
    const jobPosition = await this.findOne(uuid, accountId);
    if (!jobPosition) {
      throw new NotFoundException(`Cargo com UUID "${uuid}" não encontrado para esta conta ao tentar atualizar.`);
    }
    this.jobPositionRepository.merge(jobPosition, updateJobPositionDto);
    return this.jobPositionRepository.save(jobPosition);
  }

  async remove(uuid: string, accountId: number): Promise<void> {
    const result = await this.jobPositionRepository.delete({ uuid, account_id: accountId });
    if (result.affected === 0) {
      throw new NotFoundException(`Cargo com UUID "${uuid}" não encontrado para esta conta ao tentar deletar.`);
    }
  }
}
