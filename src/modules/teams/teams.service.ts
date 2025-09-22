import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

@Injectable()
export class TeamsService extends BaseService<Team> {
  constructor(
    @InjectRepository(Team)
    protected readonly repository: Repository<Team>,
    private readonly usersService: UsersService,
    private readonly teamMembersService: TeamMembersService,
  ) {
    super(repository);
  }

  async createWithAccountId(dto: CreateTeamDto, accountId: number, user: User): Promise<Team> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newTeamEntity = queryRunner.manager.create(Team, {
        name: dto.name,
        account_id: accountId,
        created_by_user_id: user.id,
      });
      const team = await queryRunner.manager.save(newTeamEntity);

      const memberUuids = [...new Set([...dto.member_uuids, user.uuid])];
      const members = await this.usersService.findByUuidsAndAccountId(memberUuids, accountId);
      const memberIds = members.map(member => member.id);
      
      await this.teamMembersService.createMany(team.id, accountId, memberIds, queryRunner.manager);

      await queryRunner.commitTransaction();

      const createdTeam = await this.repository.findOne({
        where: { uuid: team.uuid, account_id: accountId },
        relations: ['createdBy', 'teamMembers', 'teamMembers.user'],
      });
      return createdTeam;
    } catch (err) {
      await queryRunner.rollbackTransaction();
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
