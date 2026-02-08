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
      const leaderUser = await this.usersService.findOneByUuidAndAccountId(dto.leader, user.account_id);
      if (!leaderUser) {
        throw new NotFoundException(`Usuário com UUID "${dto.leader}" não encontrado ao tentar criar time.`);
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
        leader_user_id: leaderUser.id,
        sector_id: sectorId,
      });
      const team = await queryRunner.manager.save(newTeamEntity);

      const membersToInclude = new Set([ dto.leader, ...dto.member_uuids ]);
      const memberUuids = Array.from(membersToInclude);

      const members = await this.usersService.findByUuidsAndAccountId(memberUuids, user.account_id);
      const memberIds = members.map(member => member.id);
      
      await this.teamMembersService.createMany(team.id, user.account_id, memberIds, queryRunner.manager);

      await queryRunner.commitTransaction();
      committed = true;

      // ARRUMAR PARA NAO BUSCAR TUDO DE NOVO
      const createdTeam = await this.repository.findOne({
          where: { uuid: team.uuid, account_id: user.account_id },
          relations: ['createdBy', 'teamMembers', 'teamMembers.user', 'sector', 'leader'],
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
        qb.leftJoinAndSelect('entity.createdBy', 'createdBy');
        qb.leftJoinAndSelect('entity.teamMembers', 'teamMembers');
        qb.leftJoinAndSelect('teamMembers.user', 'teamMemberUser');
        qb.leftJoinAndSelect('entity.leader', 'leader');
        qb.leftJoinAndSelect('entity.sector', 'sector');
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

      const existingMemberUuids = existingTeam.teamMembers.map(member => ({ uuid: member.uuid, user_uuid: member.user.uuid }));
      const incomingMemberUuids = [...new Set([...dto.member_uuids])];
      
      const membersToDeleteUserUuids = existingMemberUuids.filter(member => !incomingMemberUuids.includes(member.user_uuid));
      const membersToAddUuids = incomingMemberUuids.filter(uuid => !existingMemberUuids.some(member => uuid === member.user_uuid));

      if (membersToDeleteUserUuids.length > 0) {
        console.log('TESTE', membersToDeleteUserUuids)
        const membersToDeleteUuids = membersToDeleteUserUuids.map(member => member.uuid)
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

  async totalsTeams(accountId: number): Promise<{
    total: number;
    pending_sector_settings: number;
    exceeded_team_members: number;
  }> {
    // Total de times para essa accountId
    const total = await this.repository.count({
      where: { account_id: accountId },
    });

    // Times sem setor vinculado (sector_id IS NULL)
    const pending_sector_settings = await this.repository
      .createQueryBuilder('team')
      .where('team.account_id = :accountId', { accountId })
      .andWhere('team.sector_id IS NULL')
      .getCount();

    // Times que passam de 10 colaboradores
    // Buscar times com mais de 10 teamMembers
    const teamsWithExceededMembersResult = await this.repository
      .createQueryBuilder('team')
      .leftJoin('team.teamMembers', 'teamMember')
      .where('team.account_id = :accountId', { accountId })
      .groupBy('team.id')
      .having('COUNT(teamMember.id) > :maxMembers', { maxMembers: 10 })
      .select('team.id')
      .getRawMany();
    
    const teamsWithExceededMembers = teamsWithExceededMembersResult.length;

    return {
      total,
      pending_sector_settings,
      exceeded_team_members: teamsWithExceededMembers,
    };
  }
}
