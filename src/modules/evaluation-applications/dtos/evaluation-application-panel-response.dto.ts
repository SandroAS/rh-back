import { Expose, Type } from 'class-transformer';
import {
  EvaluationApplication,
  EvaluationApplicationStatus,
  EvaluationType,
} from '@/entities/evaluation-application.entity';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { FormResponseResponseDto } from '@/modules/form-responses/dtos/form-response-response.dto';

export class EvaluationApplicationPanelResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  description: string | null;

  @Expose()
  rate: number;

  @Expose()
  type: EvaluationType;

  @Expose()
  status: EvaluationApplicationStatus;

  @Expose()
  started_date: Date;

  @Expose()
  expiration_date: Date | null;

  @Expose()
  finished_at: Date | null;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  submittingUser: UserAvatarResponseDto | null;

  @Expose()
  @Type(() => FormResponseResponseDto)
  responses: FormResponseResponseDto[];

  constructor(application: EvaluationApplication) {
    this.uuid = application.uuid;
    this.name = application.name;
    this.description = application.description ?? null;
    this.rate = Number(application.rate);
    this.type = application.type;
    this.status = application.status;
    this.started_date = application.started_date;
    this.expiration_date = application.expiration_date ?? null;
    this.finished_at = application.finished_at ?? null;
    this.submittingUser = application.submittingUser
      ? new UserAvatarResponseDto(application.submittingUser)
      : null;
    this.responses = (application.responses || []).map(
      (r) => new FormResponseResponseDto(r),
    );
  }
}
