import { Expose, Exclude, Type } from 'class-transformer';
import { FormAnswer } from '@/entities/form-answer.entity';
import { FormAnswerMultiOptionResponseDto } from '@/modules/form-answer-multi-options/dtos/form-answer-multi-option-response.dto';

@Exclude()
export class FormAnswerResponseDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly application_question_uuid: string;
  
  @Expose()
  readonly application_option_uuid: string | null;

  @Expose()
  readonly created_at: Date;

  @Expose()
  readonly value: string | string[] | null; 

  @Expose()
  @Type(() => FormAnswerMultiOptionResponseDto)
  readonly multi_options: FormAnswerMultiOptionResponseDto[];

  constructor(answer: FormAnswer) {
    this.uuid = answer.uuid;
    this.created_at = answer.created_at;

    this.application_question_uuid = (answer.applicationQuestion as any)?.uuid || '';
    this.application_option_uuid = (answer.applicationOption as any)?.uuid || null;

    if (answer.multiOptions && answer.multiOptions.length > 0) {
      this.multi_options = answer.multiOptions.map(multi => new FormAnswerMultiOptionResponseDto(multi));
      this.value = this.multi_options.map(mo => mo.application_option_uuid);
    } else {
      this.multi_options = [];

      if (answer.text_value !== null) {
        this.value = answer.text_value;
      } else if (this.application_option_uuid !== null) {
        this.value = this.application_option_uuid;
      } else {
        this.value = null;
      }
    }
  }
}
