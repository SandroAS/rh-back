import { Expose } from 'class-transformer';
import { EvaluationApplicationsChartItemDto } from './evaluation-applications-chart-item.dto';
export class EvaluationApplicationsChartResponseDto {
  @Expose()
  data: EvaluationApplicationsChartItemDto[];

  constructor(data: EvaluationApplicationsChartItemDto[]) {
    this.data = data;
  }
}
