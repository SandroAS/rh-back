import { Expose } from 'class-transformer';

export class TotalsEvaluationApplicationsResponseDto {
  @Expose()
  total: number;

  @Expose()
  completed: number;

  @Expose()
  pending: number;

  @Expose()
  expired: number;

  constructor(total: number, completed: number, pending: number, expired: number) {
    this.total = total;
    this.completed = completed;
    this.pending = pending;
    this.expired = expired;
  }
}
