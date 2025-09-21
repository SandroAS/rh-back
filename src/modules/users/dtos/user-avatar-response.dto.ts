import { User } from '@/entities/user.entity';
import { Expose } from 'class-transformer';

export class UserAvatarResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  profile_img_url: string;

  constructor(partial: User) {
    this.uuid = partial.uuid;
    this.name = partial.name;
    this.profile_img_url = partial.profile_img_url;
  }
}
