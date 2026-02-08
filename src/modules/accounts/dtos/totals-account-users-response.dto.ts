import { Expose } from 'class-transformer';

export class TotalsAccountUsersResponseDto {
  @Expose()
  total: number;

  @Expose()
  pending_job_position_settings: number;

  @Expose()
  pending_evaluation_settings: number;

  @Expose()
  not_evaluated_yet: number;

  constructor(total: number, pending_job_position_settings: number, pending_evaluation_settings: number, not_evaluated_yet: number) {
    this.total = total;
    this.pending_job_position_settings = pending_job_position_settings;
    this.pending_evaluation_settings = pending_evaluation_settings;
    this.not_evaluated_yet = not_evaluated_yet;
  }
}
