import { Expose, Type } from 'class-transformer';
import { Sector } from '@/entities/sector.entity';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';

export class SectorResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  users: UserAvatarResponseDto[];

  constructor(partial: Partial<Sector>) {
    Object.assign(this, partial);
    if (partial.users) {
      this.users = partial.users.map(user => new UserAvatarResponseDto(user));
    }
  }
}
