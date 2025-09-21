import { JobPositionsLevel } from '@/entities/job-position-level.entity';
import { Expose } from 'class-transformer';

export default class JobPositionLevelResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  salary: number;

  @Expose()
  order: number;

  constructor(partial: JobPositionsLevel) {
    this.uuid = partial.uuid;
    this.name = partial.name;
    this.salary = partial.salary;
    this.order = partial.order;
  }
}
