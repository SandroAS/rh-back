import { User } from '@/entities/user.entity';
import { Expose, Type } from 'class-transformer';
import JobPositionSimpleResponseDto from '@/modules/job-positions/dtos/job-position-simple-response.dto';

export class UserAvatarResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  profile_img_url: string;

  @Expose()
  @Type(() => JobPositionSimpleResponseDto)
  jobPosition: JobPositionSimpleResponseDto | null;

  constructor(user: User) {
    this.uuid = user.uuid;
    this.name = user.name;
    this.email = user.email;
    this.profile_img_url = user.profile_img_url;
    this.jobPosition = user.jobPosition ? new JobPositionSimpleResponseDto(user.jobPosition) : null;
  }
}
