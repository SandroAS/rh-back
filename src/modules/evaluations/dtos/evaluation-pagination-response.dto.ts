import { EvaluationResponseDto } from './evaluation-response.dto';

export class EvaluationPaginationResponseDto {
  readonly data: EvaluationResponseDto[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}
