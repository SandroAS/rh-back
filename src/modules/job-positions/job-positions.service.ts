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

  async create(createJobPositionDto: CreateJobPositionDto): Promise<JobPosition> {
    const jobPosition = this.jobPositionRepository.create(createJobPositionDto);
    return this.jobPositionRepository.save(jobPosition);
  }

  async findAll(): Promise<JobPosition[]> {
    return this.jobPositionRepository.find();
  }

  async findOne(uuid: string): Promise<JobPosition> {
    const jobPosition = await this.jobPositionRepository.findOne({ where: { uuid } });
    return jobPosition;
  }

  async update(uuid: string, updateJobPositionDto: UpdateJobPositionDto): Promise<JobPosition> {
    const jobPosition = await this.findOne(uuid);

    if (!jobPosition) {
      throw new NotFoundException(`Cargo com UUID "${uuid}" não encontrado ao tentar atualizar.`);
    }

    this.jobPositionRepository.merge(jobPosition, updateJobPositionDto);
    return this.jobPositionRepository.save(jobPosition);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.jobPositionRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new NotFoundException(`Cargo com UUID "${uuid}" não encontrado ao tentar deletar.`);
    }
  }
}
