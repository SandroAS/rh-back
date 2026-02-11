import { Expose } from 'class-transformer';

export class EvaluationApplicationsChartItemDto {
  @Expose()
  month: string; // Formato YYYY-MM

  @Expose()
  completed_evaluations_count: number;

  @Expose()
  average_rate_percentage: number;

  constructor(month: string, completed_evaluations_count: number, average_rate_percentage: number) {
    this.month = month;
    this.completed_evaluations_count = completed_evaluations_count;
    this.average_rate_percentage = average_rate_percentage;
  }
}
