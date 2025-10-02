import { Expose, Type } from 'class-transformer';
import { Team } from '@/entities/team.entity';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { TeamMemberResponseDto } from '../../team-members/dtos/team-member-response.dto';
import { SectorResponseDto } from '@/modules/sectors/dtos/sector-response.dto';

export class TeamResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  createdBy: UserAvatarResponseDto;

  @Expose()
  leader: UserAvatarResponseDto;

  @Expose()
  sector: SectorResponseDto;

  @Expose()
  @Type(() => TeamMemberResponseDto)
  teamMembers: TeamMemberResponseDto[];

  constructor(team: Team) {
    this.uuid = team.uuid;
    this.name = team.name
    
    if (team.leader) {
      this.leader = new UserAvatarResponseDto(team.leader);
    }

    if (team.createdBy) {
      this.createdBy = new UserAvatarResponseDto(team.createdBy);
    }

    if (team.sector) {
      this.sector = new SectorResponseDto(team.sector);
    }

    if (team.teamMembers && team.teamMembers.length > 0) {
      this.teamMembers = team.teamMembers.map(
        (teamMember) => new TeamMemberResponseDto(teamMember)
      );
    }
  }
}