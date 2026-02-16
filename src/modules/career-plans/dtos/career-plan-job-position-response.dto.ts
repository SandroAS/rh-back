import { Expose, Type } from 'class-transformer';
import { CareerPlanJobPosition } from '@/entities/career-plan-job-position.entity';
import JobPositionSimpleResponseDto from '@/modules/job-positions/dtos/job-position-simple-response.dto';
import { CareerPlanNameUuidResponseDto } from '@/modules/career-plans/dtos/career-plan-name-uuid-response.dto';

export class CareerPlanJobPositionResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  job_position_uuid: string;

  @Expose()
  order: number;

  @Expose()
  career_plan_y_uuid: string | null;

  @Expose()
  @Type(() => JobPositionSimpleResponseDto)
  jobPosition: JobPositionSimpleResponseDto | null;

  @Expose()
  @Type(() => CareerPlanNameUuidResponseDto)
  careerPlanY: CareerPlanNameUuidResponseDto | null;

  constructor(item: CareerPlanJobPosition) {
    this.uuid = item.uuid;
    this.job_position_uuid = item.jobPosition?.uuid ?? '';
    this.order = item.order;
    this.career_plan_y_uuid = item.careerPlanY?.uuid ?? null;
    this.jobPosition = item.jobPosition
      ? new JobPositionSimpleResponseDto(item.jobPosition)
      : null;
    this.careerPlanY = item.careerPlanY
      ? new CareerPlanNameUuidResponseDto(item.careerPlanY)
      : null;
  }
}
