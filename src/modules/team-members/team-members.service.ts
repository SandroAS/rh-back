// src/team-members/team-members.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { TeamMember } from '@/entities/team-member.entity';
import { BaseService } from '@/common/services/base.service';

@Injectable()
export class TeamMembersService extends BaseService<TeamMember> {
  constructor(
    @InjectRepository(TeamMember)
    protected readonly repository: Repository<TeamMember>,
  ) {
    super(repository);
  }

  /**
   * Cria múltiplos membros de time em uma única operação.
   * @param teamId ID numérica do time.
   * @param accountId ID numérica da conta.
   * @param userIds Array de IDs numéricas dos usuários.
   * @param manager Opcional: EntityManager para transações.
   * @returns Array dos membros de time criados.
   */
  async createMany(
    teamId: number,
    accountId: number,
    userIds: number[],
    manager?: EntityManager,
  ): Promise<TeamMember[]> {
    const teamMemberRepo = manager ? manager.getRepository(TeamMember) : this.repository;
    
    const newTeamMembers = userIds.map(userId =>
      teamMemberRepo.create({
        team_id: teamId,
        user_id: userId,
        account_id: accountId,
      })
    );
    return await teamMemberRepo.save(newTeamMembers);
  }

  /**
   * Remove múltiplos membros de time de uma única vez.
   * @param teamId ID numérica do time.
   * @param uuids Array de UUIDs dos membros a serem removidos.
   * @param manager Opcional: EntityManager para transações.
   */
  async removeByTeamIdAndUserUuids(
    teamId: number,
    uuids: string[],
    manager?: EntityManager,
  ): Promise<void> {
    const teamMemberRepo = manager ? manager.getRepository(TeamMember) : this.repository;

    const result = await teamMemberRepo.delete({
      team_id: teamId,
      uuid: In(uuids),
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Nenhum membro de time encontrado para remoção.`);
    }
  }
}
