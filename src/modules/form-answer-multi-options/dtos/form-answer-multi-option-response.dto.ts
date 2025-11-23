import { Expose, Exclude } from 'class-transformer';
import { FormAnswerMultiOption } from '@/entities/form-answer-multi-option.entity';

@Exclude()
export class FormAnswerMultiOptionResponseDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly application_option_uuid: string;

  constructor(multiOption: FormAnswerMultiOption) {
    this.uuid = multiOption.uuid;
    this.application_option_uuid = (multiOption.applicationOption as any)?.uuid || '';
  }
}