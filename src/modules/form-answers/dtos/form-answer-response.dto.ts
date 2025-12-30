import { Expose, Exclude, Type } from 'class-transformer';
import { FormAnswer } from '@/entities/form-answer.entity';
import { FormAnswerMultiOptionResponseDto } from '@/modules/form-answer-multi-options/dtos/form-answer-multi-option-response.dto';
import FormApplicationQuestionOptionResponseDto from '@/modules/form-application-question-options/dtos/form-application-question-option-response.dto';
import FormApplicationQuestionResponseDto from '@/modules/form-application-questions/dtos/form-application-question-response.dto';

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
  readonly text_value: string | null;

  @Expose()
  readonly number_value: number | null;

  @Expose()
  @Type(() => FormApplicationQuestionResponseDto)
  readonly question: FormApplicationQuestionResponseDto;

  @Expose()
  @Type(() => FormApplicationQuestionOptionResponseDto)
  readonly option?: FormApplicationQuestionOptionResponseDto;

  @Expose()
  @Type(() => FormAnswerMultiOptionResponseDto)
  readonly multi_options?: FormAnswerMultiOptionResponseDto[];

  constructor(answer: FormAnswer) {
    this.uuid = answer.uuid;
    this.created_at = answer.created_at;
    this.text_value = answer.text_value;
    this.number_value = answer.number_value;

    this.application_question_uuid = (answer.applicationQuestion as any)?.uuid || '';
    this.application_option_uuid = (answer.applicationOption as any)?.uuid || null;

    if (answer.applicationQuestion) {
      this.question = new FormApplicationQuestionResponseDto(answer.applicationQuestion);
    }

    if (answer.applicationOption) {
      this.option = new FormApplicationQuestionOptionResponseDto(answer.applicationOption);
    }

    if (answer.multiOptions && answer.multiOptions.length > 0) {
      this.multi_options = answer.multiOptions.map(
        (option) => new FormAnswerMultiOptionResponseDto(option)
      );
    }
  }
}
