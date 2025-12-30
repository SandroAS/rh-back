import { Expose, Exclude, Type } from 'class-transformer';
import { FormAnswerMultiOption } from '@/entities/form-answer-multi-option.entity';
import FormApplicationQuestionOptionResponseDto from '@/modules/form-application-question-options/dtos/form-application-question-option-response.dto';

@Exclude()
export class FormAnswerMultiOptionResponseDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly application_option_uuid: string;

  @Expose()
  @Type(() => FormApplicationQuestionOptionResponseDto)
  readonly option: FormApplicationQuestionOptionResponseDto;

  constructor(multiOption: FormAnswerMultiOption) {
    this.uuid = multiOption.uuid;
    this.application_option_uuid = (multiOption.applicationOption as any)?.uuid || '';

    if (multiOption.applicationOption) {
      this.option = new FormApplicationQuestionOptionResponseDto(multiOption.applicationOption);
    }
  }
}
