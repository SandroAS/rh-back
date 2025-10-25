import { JobPosition } from '@/entities/job-position.entity';
import { Expose } from 'class-transformer';

export default class JobPositionSimpleResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  title: string;

  constructor(partial: JobPosition) {
    this.uuid = partial.uuid;
    this.title = partial.title;
  }
}
