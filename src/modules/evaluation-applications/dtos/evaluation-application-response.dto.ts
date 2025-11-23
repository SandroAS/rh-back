import { EvaluationApplication, EvaluationType } from '@/entities/evaluation-application.entity';
import { EvaluationResponseDto } from '@/modules/evaluations/dtos/evaluation-response.dto';
import { FormApplicationResponseDto } from '@/modules/form-applications/dtos/form-application-response.dto';
import { UserAvatarResponseDto } from '@/modules/users/dtos/user-avatar-response.dto';
import { Expose, Type } from 'class-transformer';

export class EvaluationApplicationResponseDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string | null;

  @Expose()
  readonly rate: number;

  @Expose()
  readonly type: EvaluationType;

  @Expose()
  readonly started_date: Date;

  @Expose()
  readonly expiration_date: Date;

  @Expose()
  readonly created_at: Date;

  @Expose()
  readonly evaluation_uuid: string;

  @Expose()
  readonly evaluated_user_uuid: string;

  @Expose()
  readonly submitting_user_uuid: string;

  @Expose()
  readonly form_application_uuid: string;
  
  @Expose()
  @Type(() => EvaluationResponseDto)
  readonly evaluation: EvaluationResponseDto;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  readonly evaluatedUser: UserAvatarResponseDto;

  @Expose()
  @Type(() => UserAvatarResponseDto)
  readonly submittingUser: UserAvatarResponseDto;
  
  @Expose()
  @Type(() => FormApplicationResponseDto)
  readonly formApplication: FormApplicationResponseDto;

  constructor(evaluationApplication: EvaluationApplication) {
    this.uuid = evaluationApplication.uuid;
    this.name = evaluationApplication.name;
    this.description = evaluationApplication.description;
    this.rate = evaluationApplication.rate;
    this.type = evaluationApplication.type;
    this.started_date = evaluationApplication.started_date;
    this.expiration_date = evaluationApplication.expiration_date;
    this.created_at = evaluationApplication.created_at;
    this.evaluation_uuid = evaluationApplication.evaluation?.uuid;
    this.evaluated_user_uuid = evaluationApplication.evaluatedUser?.uuid;
    this.submitting_user_uuid = evaluationApplication.submittingUser?.uuid;
    this.form_application_uuid = evaluationApplication.formApplication?.uuid;

    if (evaluationApplication.evaluatedUser) {
      this.evaluatedUser = new UserAvatarResponseDto(evaluationApplication.evaluatedUser);
    }

    if (evaluationApplication.submittingUser) {
      this.submittingUser = new UserAvatarResponseDto(evaluationApplication.submittingUser);
    }

    if (evaluationApplication.evaluation) {
      this.evaluation = new EvaluationResponseDto(evaluationApplication.evaluation);
    }

    if (evaluationApplication.formApplication) {
      this.formApplication = new FormApplicationResponseDto(evaluationApplication.formApplication);
    }
  }
}