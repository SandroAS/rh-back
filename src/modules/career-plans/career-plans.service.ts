import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CareerPlan } from '@/entities/career-plan.entity';
import { CareerPlanJobPosition } from '@/entities/career-plan-job-position.entity';
import { JobPosition } from '@/entities/job-position.entity';
import { BaseService } from '@/common/services/base.service';
import { CreateCareerPlanDto } from './dtos/create-career-plan.dto';
import { UpdateCareerPlanDto } from './dtos/update-career-plan.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResult } from '@/common/services/base.service';

const CAREER_PLAN_JOB_POSITIONS_RELATIONS = [
  'careerPlanJobPositions',
  'careerPlanJobPositions.jobPosition',
  'careerPlanJobPositions.careerPlanY',
];

@Injectable()
export class CareerPlansService extends BaseService<CareerPlan> {
  constructor(
    @InjectRepository(CareerPlan)
    protected readonly repository: Repository<CareerPlan>,
    @InjectRepository(CareerPlanJobPosition)
    private readonly careerPlanJobPositionRepository: Repository<CareerPlanJobPosition>,
    @InjectRepository(JobPosition)
    private readonly jobPositionRepository: Repository<JobPosition>,
    private readonly dataSource: DataSource,
  ) {
    super(repository);
  }

  async createWithAccountId(dto: CreateCareerPlanDto, accountId: number): Promise<CareerPlan> {
    const existing = await this.repository.findOne({
      where: { name: dto.name, account_id: accountId },
    });
    if (existing) {
      throw new ConflictException(
        `Plano de carreira com o nome "${dto.name}" já existe na sua conta.`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const careerPlan = queryRunner.manager.create(CareerPlan, {
        name: dto.name,
        account_id: accountId,
      });
      const savedPlan = await queryRunner.manager.save(CareerPlan, careerPlan);

      await this.syncCareerPlanJobPositions(
        savedPlan.id,
        dto.careerPlanJobPositions,
        accountId,
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();
      return this.findOneByUuidOrThrow(savedPlan.uuid, accountId);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }
      throw new InternalServerErrorException(
        'Erro ao criar plano de carreira: ' + (err as Error).message,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAllWithAccountId(accountId: number): Promise<CareerPlan[]> {
    return this.repository.find({
      where: { account_id: accountId },
      relations: CAREER_PLAN_JOB_POSITIONS_RELATIONS,
      order: { created_at: 'DESC' },
    });
  }

  async findAndPaginateWithAccountId(
    pagination: PaginationDto,
    accountId: number,
  ): Promise<PaginationResult<CareerPlan>> {
    const searchColumns = ['name'];
    return super.findAndPaginate(pagination, searchColumns, (qb) => {
      qb.andWhere('entity.account_id = :accountId', { accountId });
      qb.leftJoinAndSelect('entity.careerPlanJobPositions', 'careerPlanJobPositions');
      qb.leftJoinAndSelect('careerPlanJobPositions.jobPosition', 'jobPosition');
      qb.leftJoinAndSelect('careerPlanJobPositions.careerPlanY', 'careerPlanY');
      qb.orderBy('entity.created_at', 'DESC');
    });
  }

  async findOneByUuidOrThrow(uuid: string, accountId: number): Promise<CareerPlan> {
    const plan = await this.repository.findOne({
      where: { uuid, account_id: accountId },
      relations: CAREER_PLAN_JOB_POSITIONS_RELATIONS,
    });
    if (!plan) {
      throw new NotFoundException(`Plano de carreira com UUID "${uuid}" não encontrado.`);
    }
    return plan;
  }

  async updateByUuid(
    uuid: string,
    dto: UpdateCareerPlanDto,
    accountId: number,
  ): Promise<CareerPlan> {
    const plan = await this.findOneByUuidOrThrow(uuid, accountId);

    if (dto.name !== undefined) {
      const existingByName = await this.repository.findOne({
        where: { name: dto.name, account_id: accountId },
      });
      if (existingByName && existingByName.uuid !== uuid) {
        throw new ConflictException(
          `Plano de carreira com o nome "${dto.name}" já existe na sua conta.`,
        );
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (dto.name !== undefined) {
        plan.name = dto.name;
        await queryRunner.manager.save(CareerPlan, plan);
      }

      if (dto.careerPlanJobPositions !== undefined) {
        await this.syncCareerPlanJobPositions(
          plan.id,
          dto.careerPlanJobPositions,
          accountId,
          queryRunner.manager,
        );
      }

      await queryRunner.commitTransaction();
      return this.findOneByUuidOrThrow(uuid, accountId);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof NotFoundException || err instanceof ConflictException) {
        throw err;
      }
      throw new InternalServerErrorException(
        'Erro ao atualizar plano de carreira: ' + (err as Error).message,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async removeByUuid(uuid: string, accountId: number): Promise<boolean> {
    const plan = await this.repository.findOne({
      where: { uuid, account_id: accountId },
    });
    if (!plan) {
      throw new NotFoundException(`Plano de carreira com UUID "${uuid}" não encontrado.`);
    }
    await this.repository.remove(plan);
    return true;
  }

  private async resolveJobPositionIds(
    items: { job_position_uuid: string }[],
    accountId: number,
    manager?: EntityManager,
  ): Promise<Map<string, number>> {
    const uuids = [...new Set(items.map((i) => i.job_position_uuid))];
    const repo = manager ? manager.getRepository(JobPosition) : this.jobPositionRepository;
    const positions = await repo.find({
      where: uuids.map((uuid) => ({ uuid, account_id: accountId })),
    });
    const map = new Map<string, number>();
    for (const p of positions) {
      map.set(p.uuid, p.id);
    }
    const notFound = uuids.filter((uuid) => !map.has(uuid));
    if (notFound.length > 0) {
      throw new NotFoundException(
        `Cargo(s) com UUID(s) não encontrado(s): ${notFound.join(', ')}`,
      );
    }
    return map;
  }

  private async resolveCareerPlanYIds(
    items: { career_plan_y_uuid?: string | null }[],
    accountId: number,
    manager?: EntityManager,
  ): Promise<Map<string, number>> {
    const uuids = [
      ...new Set(
        items
          .map((i) => i.career_plan_y_uuid)
          .filter((u): u is string => u != null && u !== ''),
      ),
    ];
    if (uuids.length === 0) return new Map();
    const repo = manager ? manager.getRepository(CareerPlan) : this.repository;
    const plans = await repo.find({
      where: uuids.map((uuid) => ({ uuid, account_id: accountId })),
    });
    const map = new Map<string, number>();
    for (const p of plans) {
      map.set(p.uuid, p.id);
    }
    const notFound = uuids.filter((uuid) => !map.has(uuid));
    if (notFound.length > 0) {
      throw new NotFoundException(
        `Plano(s) de carreira Y com UUID(s) não encontrado(s): ${notFound.join(', ')}`,
      );
    }
    return map;
  }

  private async syncCareerPlanJobPositions(
    careerPlanId: number,
    items: {
      job_position_uuid: string;
      order: number;
      career_plan_y_uuid?: string | null;
    }[],
    accountId: number,
    manager?: EntityManager,
  ): Promise<void> {
    const repo = manager
      ? manager.getRepository(CareerPlanJobPosition)
      : this.careerPlanJobPositionRepository;

    await repo.delete({ career_plan_id: careerPlanId });

    if (items.length === 0) return;

    const jobPositionIdByUuid = await this.resolveJobPositionIds(items, accountId, manager);
    const careerPlanYIdByUuid = await this.resolveCareerPlanYIds(items, accountId, manager);

    const toInsert = items.map((item) => {
      const careerPlanYId = item.career_plan_y_uuid
        ? careerPlanYIdByUuid.get(item.career_plan_y_uuid) ?? null
        : null;
      return repo.create({
        career_plan_id: careerPlanId,
        job_position_id: jobPositionIdByUuid.get(item.job_position_uuid)!,
        order: item.order,
        career_plan_y_id: careerPlanYId,
      });
    });
    await repo.save(toInsert);
  }
}
