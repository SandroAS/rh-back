import { Expose, Type } from 'class-transformer';
import { CareerPlanJobPosition } from '@/entities/career-plan-job-position.entity';
import JobPositionSimpleResponseDto from '@/modules/job-positions/dtos/job-position-simple-response.dto';

export class CareerPlanJobPositionResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  job_position_uuid: string;

  @Expose()
  order: number;

  @Expose()
  career_in_ypsilon: boolean;

  @Expose()
  ypsilon_after_order: number | null;

  @Expose()
  @Type(() => JobPositionSimpleResponseDto)
  jobPosition: JobPositionSimpleResponseDto | null;

  constructor(item: CareerPlanJobPosition) {
    this.uuid = item.uuid;
    this.job_position_uuid = item.jobPosition?.uuid ?? '';
    this.order = item.order;
    this.career_in_ypsilon = item.career_in_ypsilon;
    this.ypsilon_after_order = item.ypsilon_after_order ?? null;
    this.jobPosition = item.jobPosition
      ? new JobPositionSimpleResponseDto(item.jobPosition)
      : null;
  }
}
