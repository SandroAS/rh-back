import { Expose } from 'class-transformer';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { TeamMember } from '@/entities/team-member.entity';

export class TeamMemberResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  user: UserAvatarResponseDto;

  constructor(teamMember: TeamMember) {
    this.uuid = teamMember.uuid;

    if (teamMember.user) {
      this.user = new UserAvatarResponseDto(teamMember.user);
    }
  }
}
