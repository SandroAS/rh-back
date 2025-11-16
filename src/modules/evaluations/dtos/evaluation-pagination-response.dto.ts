import { Expose, Type } from 'class-transformer';
import { EvaluationResponseDto } from './evaluation-response.dto';
import { Evaluation } from '@/entities/evaluation.entity';

export class EvaluationPaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  last_page: number;

  @Expose()
  limit: number;

  @Expose()
  @Type(() => EvaluationResponseDto)
  data: EvaluationResponseDto[];

  constructor(evaluationPagination: { data: Evaluation[], total: number, page: number, last_page: number, limit: number }) {
    this.total = evaluationPagination.total;
    this.page = evaluationPagination.page;
    this.last_page = evaluationPagination.last_page;
    this.limit = evaluationPagination.limit;
    this.data = [];

    if (evaluationPagination.data && evaluationPagination.data.length > 0) {
      this.data = evaluationPagination.data.map(
        (evaluation: Evaluation) => new EvaluationResponseDto(evaluation)
      );
    }
  }
}
