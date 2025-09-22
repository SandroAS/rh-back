import { Expose, Type } from 'class-transformer';
import { Team } from '@/entities/team.entity';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { TeamMemberResponseDto } from '../../team-members/dtos/team-member-response.dto';

export class TeamResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  createdBy: UserAvatarResponseDto;

  @Expose()
  lead: UserAvatarResponseDto;

  @Expose()
  @Type(() => TeamMemberResponseDto)
  teamMembers: TeamMemberResponseDto[];

  constructor(partial: Partial<Team>) {
    Object.assign(this, partial);
    if (partial.lead) {
      this.lead = new UserAvatarResponseDto(partial.lead);
    }

    if (partial.createdBy) {
      this.createdBy = new UserAvatarResponseDto(partial.createdBy);
    }

    if (partial.teamMembers) {
      this.teamMembers = partial.teamMembers.map(member => new TeamMemberResponseDto(member));
    }
  }
}