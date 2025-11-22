import { Expose, Type } from 'class-transformer';
import { EvaluationApplicationResponseDto } from './evaluation-application-response.dto';
import { EvaluationApplication } from '@/entities/evaluation-application.entity';

export class EvaluationApplicationPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => EvaluationApplicationResponseDto)
  data: EvaluationApplicationResponseDto[];

  constructor(evaluationApplicationPagination: { data: EvaluationApplication[], total: number, page: number, last_page: number, limit: number }) {
    this.total = evaluationApplicationPagination.total;
    this.page = evaluationApplicationPagination.page;
    this.last_page = evaluationApplicationPagination.last_page;
    this.limit = evaluationApplicationPagination.limit;
    this.data = [];

    if (evaluationApplicationPagination.data && evaluationApplicationPagination.data.length > 0) {
      this.data = evaluationApplicationPagination.data.map(
        (evaluationApplication: EvaluationApplication) => new EvaluationApplicationResponseDto(evaluationApplication)
      );
    }
  }
}
