import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';
import { CreateJobPositionsLevelsGroupDto } from './dtos/create-job-positions-levels-group.dto';
import { UpdateJobPositionsLevelsGroupDto } from './dtos/update-job-positions-levels-group.dto';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import AppDataSource from '@/data-source';
import { JobPositionsLevelsService } from '../job-positions-levels/job-positions-levels.service';
import { User } from '@/entities/user.entity';

@Injectable()
export class JobPositionsLevelsGroupsService extends BaseService<JobPositionsLevelsGroup> {
  constructor(
    @InjectRepository(JobPositionsLevelsGroup)
    protected readonly repository: Repository<JobPositionsLevelsGroup>,
    private readonly jobPositionsLevelsService: JobPositionsLevelsService,
  ) {
    super(repository);
  }

  async createWithAccountId(dto: CreateJobPositionsLevelsGroupDto, accountId: number, user: User): Promise<JobPositionsLevelsGroup> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const jobPositionsLevelsGroupsRepository = queryRunner.manager.getRepository(JobPositionsLevelsGroup);
      const newGroupEntity = jobPositionsLevelsGroupsRepository.create({ name: dto.name, account_id: accountId, created_by_user_id: user.id });
      const levelsGroup = await jobPositionsLevelsGroupsRepository.save(newGroupEntity);

      if (dto.jobPositionsLevels && dto.jobPositionsLevels.length > 0) {
        levelsGroup.jobPositionsLevels = await Promise.all(
          dto.jobPositionsLevels.map(async levelDto => {
            const level = await this.jobPositionsLevelsService.createWithAccountId({
              name: levelDto.name,
              salary: levelDto.salary,
              job_positions_levels_group_id: levelsGroup.id,
            }, accountId, queryRunner.manager);
            return level;
          })
        );
      }

      await queryRunner.commitTransaction();

      levelsGroup.createdBy = user;

      return levelsGroup;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Erro ao criar o grupo de níveis de cargo: ' + err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllWithAccountId(accountId: number): Promise<JobPositionsLevelsGroup[]> {
    return await super.findAll({
      where: { account_id: accountId },
      relations: ['jobPositionsLevels', 'createdBy'],
    });
  }

  async findAndPaginateWithAccountId(pagination: PaginationDto, accountId: number): Promise<any> {
    const searchColumns = ['name'];
    return await super.findAndPaginate(
      pagination,
      searchColumns,
      (qb) => {
        qb.select('entity');
        qb.leftJoin('entity.createdBy', 'createdBy');
        qb.addSelect([ 'createdBy.uuid', 'createdBy.name', 'createdBy.profile_img_url' ]);
        qb.leftJoinAndSelect('entity.jobPositionsLevels', 'jobPositionsLevels');
        // qb.addOrderBy('jobPositionsLevels.created_at', 'ASC');
        qb.andWhere('entity.account_id = :accountId', { accountId });
      }
    );
  }

  async findOneWithAccountId(uuid: string, accountId: number): Promise<JobPositionsLevelsGroup> {
    const group = await super.findOne({ where: { uuid, account_id: accountId }, relations: ['jobPositionsLevels'] });
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
