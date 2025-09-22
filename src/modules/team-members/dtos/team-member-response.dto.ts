import { Expose } from 'class-transformer';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { TeamMember } from '@/entities/team-member.entity';

export class TeamMemberResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  user: UserAvatarResponseDto;

  constructor(partial: Partial<TeamMember>) {
    Object.assign(this, partial);
    if (partial.user) {
      this.user = new UserAvatarResponseDto(partial.user);
    }
  }
}
