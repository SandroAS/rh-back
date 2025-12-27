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
  readonly is_completed: boolean;

  @Expose()
  readonly submitted_at: Date | null;

  @Expose()
  @Type(() => FormAnswerResponseDto)
  readonly answers: FormAnswerResponseDto[];

  constructor(response: FormResponse) {
    this.uuid = response.uuid;
    this.is_completed = response.is_completed;
    this.submitted_at = response.submitted_at;
    this.form_application_uuid = (response.formApplication)?.uuid || '';
    this.evaluation_application_uuid = (response.evaluationApplication)?.uuid || null;
    this.answers = [];

    if (response.answers) {
      this.answers = response.answers.map(answer => new FormAnswerResponseDto(answer));
    }
  }
}
