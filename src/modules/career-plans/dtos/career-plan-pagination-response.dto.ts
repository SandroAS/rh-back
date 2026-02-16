import { Expose, Type } from 'class-transformer';
import { CareerPlan } from '@/entities/career-plan.entity';
import { CareerPlanResponseDto } from './career-plan-response.dto';

export class CareerPlanPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => CareerPlanResponseDto)
  data: CareerPlanResponseDto[];

  constructor(pagination: {
    data: CareerPlan[];
    total: number;
    page: number;
    last_page: number;
    limit: number;
  }) {
    this.total = pagination.total;
    this.page = pagination.page;
    this.last_page = pagination.last_page;
    this.limit = pagination.limit;
    this.data = (pagination.data || []).map((item) => new CareerPlanResponseDto(item));
  }
}
