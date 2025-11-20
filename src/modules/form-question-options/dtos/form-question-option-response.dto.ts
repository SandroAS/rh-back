import { FormQuestionOption } from '@/entities/form-question-option.entity';
import { Expose } from 'class-transformer';

export class FormQuestionOptionResponseDto {
  
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly text: string;

  @Expose()
  readonly order: number;

  constructor(formQuestionOption: FormQuestionOption) {
    this.uuid = formQuestionOption.uuid;
    this.text = formQuestionOption.text;
    this.order = formQuestionOption.order;
  }
}