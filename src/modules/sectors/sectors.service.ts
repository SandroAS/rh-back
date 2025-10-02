import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { Sector } from '@/entities/sector.entity';
import { UsersService } from '@/modules/users/users.service';
import { CreateSectorDto } from './dtos/create-sector.dto';
import { UpdateSectorDto } from './dtos/update-sector.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import AppDataSource from '@/data-source';

@Injectable()
export class SectorsService extends BaseService<Sector> {
  constructor(
    @InjectRepository(Sector)
    protected readonly repository: Repository<Sector>,
    private readonly usersService: UsersService,
  ) {
    super(repository);
  }

  async createWithAccountId(dto: CreateSectorDto, accountId: number): Promise<Sector> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newSectorEntity = queryRunner.manager.create(Sector, {
        name: dto.name,
        account_id: accountId,
      });

      if (dto.user_uuids && dto.user_uuids.length > 0) {
        newSectorEntity.users = await this.usersService.findByUuidsAndAccountId(dto.user_uuids, accountId);
      }
      
      const sector = await queryRunner.manager.save(newSectorEntity);
      await queryRunner.commitTransaction();

      return await this.findOneWithAccountId(sector.uuid, accountId, ['users']);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Erro ao criar o setor: ' + err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllWithAccountId(accountId: number): Promise<Sector[]> {
    return await this.repository.find({
      where: { account_id: accountId },
      relations: ['users'],
    });
  }

  async findAndPaginateWithAccountId(pagination: PaginationDto, accountId: number): Promise<PaginationResult<Sector>> {
    const searchColumns = ['name'];
    return await super.findAndPaginate(
      pagination,
      searchColumns,
      (qb) => {
        qb.select('entity');
        qb.leftJoinAndSelect('entity.users', 'users');
        qb.andWhere('entity.account_id = :accountId', { accountId });
      }
    );
  }

  async findOneWithAccountId(uuid: string, accountId: number, relations?: string[]): Promise<Sector> {
    const sector = await this.repository.findOne({ where: { uuid, account_id: accountId }, relations });

    if (!sector) {
      throw new NotFoundException(`Setor com UUID "${uuid}" não encontrado.`);
    }
    return sector;
  }

  async updateWithAccountId(uuid: string, dto: UpdateSectorDto, accountId: number): Promise<Sector> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingSector = await queryRunner.manager.findOne(Sector, {
        where: { uuid, account_id: accountId },
        relations: ['users'],
      });

      if (!existingSector) {
        throw new NotFoundException(`Setor com UUID "${uuid}" não encontrado.`);
      }

      existingSector.name = dto.name ?? existingSector.name;

      if (dto.user_uuids) {
        existingSector.users = await this.usersService.findByUuidsAndAccountId(dto.user_uuids, accountId);
      }

      await queryRunner.manager.save(existingSector);
      await queryRunner.commitTransaction();

      return await this.findOneWithAccountId(uuid, accountId, ['users']);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Erro ao atualizar o setor: ' + err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async removeWithAccountId(uuid: string, accountId: number): Promise<void> {
    await super.removeByUuid(uuid, accountId);
  }
}
