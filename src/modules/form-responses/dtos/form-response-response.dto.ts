import { Expose, Type } from 'class-transformer';
import { FormResponse } from '@/entities/form-response.entity';
import { FormAnswerResponseDto } from '@/modules/form-answers/dtos/form-answer-response.dto';

export class FormResponseResponseDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly form_application_uuid: string;

  @Expose()
  readonly evaluation_application_uuid: string | null;

  @Expose()
  readonly user_id: number | null;

  @Expose()
  readonly is_completed: boolean;

  @Expose()
  readonly created_at: Date;
  
  @Expose()
  readonly updated_at: Date;

  @Expose()
  readonly submitted_at: Date | null;

  @Expose()
  @Type(() => FormAnswerResponseDto)
  readonly answers: FormAnswerResponseDto[];

  constructor(response: FormResponse) {
    this.uuid = response.uuid;
    this.user_id = response.user_id;
    this.is_completed = response.is_completed;
    this.created_at = response.created_at;
    this.updated_at = response.updated_at;
    this.submitted_at = response.submitted_at;

    this.form_application_uuid = (response.formApplication as any)?.uuid || '';
    this.evaluation_application_uuid = (response.evaluationApplication as any)?.uuid || null;

    if (response.answers) {
      this.answers = response.answers.map(answer => new FormAnswerResponseDto(answer));
    } else {
      this.answers = [];
    }
  }
}
