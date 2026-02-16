import { Expose } from 'class-transformer';
import { CareerPlan } from '@/entities/career-plan.entity';

export class CareerPlanNameUuidResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  constructor(partial: Partial<CareerPlan>) {
    this.uuid = partial.uuid;
    this.name = partial.name;
  }
}
