import { User } from '@/entities/user.entity';
import { Expose } from 'class-transformer';

export class UserAvatarResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  profile_img_url: string;

  constructor(user: User) {
    this.uuid = user.uuid;
    this.name = user.name;
    this.email = user.email;
    this.profile_img_url = user.profile_img_url;
  }
}
