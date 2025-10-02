import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '@/entities/team.entity';
import { BaseService } from '@/common/services/base.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import AppDataSource from '@/data-source';
import { UsersService } from '@/modules/users/users.service';
import { TeamMembersService } from '@/modules/team-members/team-members.service';
import { User } from '@/entities/user.entity';
import { PaginationResult } from '@/common/services/base.service';
import { SectorsService } from '../sectors/sectors.service';

@Injectable()
export class TeamsService extends BaseService<Team> {
  constructor(
    @InjectRepository(Team)
    protected readonly repository: Repository<Team>,
    private readonly usersService: UsersService,
    private readonly teamMembersService: TeamMembersService,
    private readonly sectorsService: SectorsService,
  ) {
    super(repository);
  }

  async createWithAccountId(dto: CreateTeamDto, user: User): Promise<Team> {
    const existingTeam = await this.repository.findOne({ where: { name: dto.name, account_id: user.account_id } });
    if (existingTeam) {
        throw new ConflictException(`Um time com o nome "${dto.name}" já existe na sua conta.`);
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let committed = false;

    try {
      const leadUser = await this.usersService.findOneByUuidAndAccountId(dto.lead, user.account_id);
      if (!leadUser) {
        throw new NotFoundException(`Usuário com UUID "${dto.lead}" não encontrado ao tentar criar time.`);
      }

      let sectorId: number | undefined;

      if (dto.sector_uuid) {
        const sector = await this.sectorsService.findOneWithAccountId(dto.sector_uuid, user.account_id);
        if (!sector) {
          throw new NotFoundException(`Setor com UUID "${dto.sector_uuid}" não encontrado ao tentar criar time.`);
        }
        sectorId = sector.id;
      }

      const newTeamEntity = queryRunner.manager.create(Team, {
        name: dto.name,
        account_id: user.account_id,
        created_by_user_id: user.id,
        lead_user_id: leadUser.id,
        sector_id: sectorId,
      });
      const team = await queryRunner.manager.save(newTeamEntity);

      const membersToInclude = new Set([ dto.lead, ...dto.member_uuids ]);
      const memberUuids = Array.from(membersToInclude);

      const members = await this.usersService.findByUuidsAndAccountId(memberUuids, user.account_id);
      const memberIds = members.map(member => member.id);
      
      await this.teamMembersService.createMany(team.id, user.account_id, memberIds, queryRunner.manager);

      await queryRunner.commitTransaction();
      committed = true;

      const createdTeam = await this.repository.findOne({
          where: { uuid: team.uuid, account_id: user.account_id },
          relations: ['createdBy', 'teamMembers', 'teamMembers.user', 'sector', 'lead'],
      });
      return createdTeam;

    } catch (err) {
        if (!committed) {
             await queryRunner.rollbackTransaction();
        }
        
        if (err instanceof NotFoundException) {
            throw err;
        }

        throw new InternalServerErrorException('Erro ao criar o time: ' + err.message);
    } finally {
        await queryRunner.release();
    }
  }

  async findAllWithAccountId(accountId: number): Promise<Team[]> {
    return await this.repository.find({
      where: { account_id: accountId },
      relations: ['createdBy', 'teamMembers', 'teamMembers.user'],
    });
  }

  async findAndPaginateWithAccountId(pagination: PaginationDto, accountId: number): Promise<PaginationResult<Team>> {
    const searchColumns = ['name'];
    return await super.findAndPaginate(
      pagination,
      searchColumns,
      (qb) => {
        qb.select('entity');
        qb.leftJoin('entity.createdBy', 'createdBy');
        qb.addSelect(['createdBy.uuid', 'createdBy.name', 'createdBy.profile_img_url']);
        qb.leftJoinAndSelect('entity.teamMembers', 'teamMembers');
        qb.leftJoinAndSelect('teamMembers.user', 'user');
        qb.andWhere('entity.account_id = :accountId', { accountId });
      }
    );
  }

  async findOneWithAccountId(uuid: string, accountId: number): Promise<Team> {
    const team = await this.repository.findOne({
      where: { uuid, account_id: accountId },
      relations: ['createdBy', 'teamMembers', 'teamMembers.user'],
    });

    if (!team) {
      throw new NotFoundException(`Time com UUID "${uuid}" não encontrado.`);
    }
    return team;
  }

  async updateWithAccountId(uuid: string, dto: UpdateTeamDto, accountId: number): Promise<Team> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingTeam = await queryRunner.manager.findOne(Team, {
        where: { uuid, account_id: accountId },
        relations: ['teamMembers', 'teamMembers.user'],
      });

      if (!existingTeam) {
        throw new NotFoundException(`Time com UUID "${uuid}" não encontrado.`);
      }

      existingTeam.name = dto.name;
      await queryRunner.manager.save(existingTeam);

      const existingMemberUuids = existingTeam.teamMembers.map(member => member.user.uuid);
      const incomingMemberUuids = [...new Set([...dto.member_uuids])];
      
      const membersToDeleteUuids = existingMemberUuids.filter(id => !incomingMemberUuids.includes(id));
      const membersToAddUuids = incomingMemberUuids.filter(id => !existingMemberUuids.includes(id));

      if (membersToDeleteUuids.length > 0) {
        await this.teamMembersService.removeByTeamIdAndUserUuids(existingTeam.id, membersToDeleteUuids, queryRunner.manager);
      }

      if (membersToAddUuids.length > 0) {
        const usersToAdd = await this.usersService.findByUuidsAndAccountId(membersToAddUuids, accountId);
        const userIdsToAdd = usersToAdd.map(user => user.id);
        await this.teamMembersService.createMany(existingTeam.id, accountId, userIdsToAdd, queryRunner.manager);
      }

      await queryRunner.commitTransaction();

      return await this.findOneWithAccountId(uuid, accountId);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Erro ao atualizar o time: ' + err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async removeWithAccountId(uuid: string, accountId: number): Promise<void> {
    await super.removeByUuid(uuid, accountId);
  }
}
