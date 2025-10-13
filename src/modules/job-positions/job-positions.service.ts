import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { JobPosition } from '@/entities/job-position.entity';
import { CreateJobPositionDto } from './dtos/create-job-position.dto';
import { UpdateJobPositionDto } from './dtos/update-job-position.dto';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { JobPositionsLevelsGroupsService } from '../job-positions-levels-groups/job-positions-levels-groups.service';
import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';

@Injectable()
export class JobPositionService extends BaseService<JobPosition> {
  constructor(
    @InjectRepository(JobPosition)
    private readonly jobPositionRepository: Repository<JobPosition>,
    private readonly levelsGroupService: JobPositionsLevelsGroupsService
  ) {
    super(jobPositionRepository);
  }

  async createWithAccountId(createJobPositionDto: CreateJobPositionDto, account_id: number): Promise<{ uuid: string }> {
    try {
      let levelsGroup: JobPositionsLevelsGroup | null = null;
      if (createJobPositionDto.job_positions_levels_group_uuid) {
        levelsGroup = await this.levelsGroupService.findOneWithAccountId(createJobPositionDto.job_positions_levels_group_uuid, account_id);

        if (!levelsGroup) {
          throw new NotFoundException(`Grupo de Níveis com UUID "${createJobPositionDto.job_positions_levels_group_uuid}" não encontrado.`);
        }
      }

      const newJobPosition = await super.create({ ...createJobPositionDto, levelsGroup, account_id });

      return { uuid: newJobPosition.uuid }; 

    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }

      throw new InternalServerErrorException('Erro ao criar o Cargo: ' + err.message);
    }
  }

  async findAllWithAccountId(accountId: number): Promise<JobPosition[]> {
    return await super.findAll({ where: { account_id: accountId }, relations: ['levelsGroup.jobPositionsLevels'] });
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
    try {
      let jobPosition = await this.findOneWithAccountId(uuid, accountId); 

      if (updateJobPositionDto.job_positions_levels_group_uuid !== undefined) {
        let levelsGroup = null;

        if (updateJobPositionDto.job_positions_levels_group_uuid) {
          levelsGroup = await this.levelsGroupService.findOneWithAccountId(updateJobPositionDto.job_positions_levels_group_uuid, accountId);

          if (!levelsGroup) {
            throw new NotFoundException(`Grupo de Níveis com UUID "${updateJobPositionDto.job_positions_levels_group_uuid}" não encontrado.`);
          }
        }

        jobPosition.levelsGroup = levelsGroup;
        jobPosition.job_positions_levels_group_id = levelsGroup.id;
      }

      this.jobPositionRepository.merge(jobPosition, updateJobPositionDto);

      const updatedJobPosition = await this.jobPositionRepository.save(jobPosition);

      return updatedJobPosition;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException('Erro ao atualizar o Cargo: ' + err.message);
    }
  }

  async removeWithAccountId(uuid: string, accountId: number): Promise<void> {
    await super.removeByUuid(uuid, accountId);
  }
}
