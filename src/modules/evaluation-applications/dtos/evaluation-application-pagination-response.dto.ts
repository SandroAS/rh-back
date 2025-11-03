import { EvaluationApplicationResponseDto } from './evaluation-application-response.dto';

export class EvaluationApplicationPaginationResponseDto {
  readonly data: EvaluationApplicationResponseDto[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}
