import { FormApplicationQuestionOption } from '@/entities/form-application-question-option.entity';
import { Expose } from 'class-transformer';

export default class FormApplicationQuestionOptionResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  text: string;

  @Expose()
  order: number;

  constructor(option: FormApplicationQuestionOption) {
    this.uuid = option.uuid;
    this.text = option.text;
    this.order = option.order;
  }
}
