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

  constructor(partial: Partial<Team>) {
    Object.assign(this, partial);
    if (partial.leader) {
      this.leader = new UserAvatarResponseDto(partial.leader);
    }

    if (partial.createdBy) {
      this.createdBy = new UserAvatarResponseDto(partial.createdBy);
    }

    if (partial.sector) {
      this.sector = new SectorResponseDto(partial.sector);
    }

    if (partial.teamMembers) {
      this.teamMembers = partial.teamMembers.map(member => new TeamMemberResponseDto(member));
    }
  }
}