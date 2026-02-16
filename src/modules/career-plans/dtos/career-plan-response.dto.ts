import { Expose, Type } from 'class-transformer';
import { CareerPlan } from '@/entities/career-plan.entity';
import { CareerPlanJobPositionResponseDto } from './career-plan-job-position-response.dto';

export class CareerPlanResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => CareerPlanJobPositionResponseDto)
  careerPlanJobPositions: CareerPlanJobPositionResponseDto[];

  constructor(careerPlan: CareerPlan) {
    this.uuid = careerPlan.uuid;
    this.name = careerPlan.name;
    this.careerPlanJobPositions = (careerPlan.careerPlanJobPositions || []).map(
      (item) => new CareerPlanJobPositionResponseDto(item),
    );
  }
}
