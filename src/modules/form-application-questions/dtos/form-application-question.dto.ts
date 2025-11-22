import { FormApplicationQuestion } from '@/entities/form-application-question.entity';
import { Expose } from 'class-transformer';

export default class FormApplicationQuestionDto {
  @Expose()
  uuid: string;

  @Expose()
  title: string;

  @Expose()
  order: number;

  constructor(question: FormApplicationQuestion) {
    if (!question) return;
    this.uuid = question.uuid;
    this.title = question.title;
    this.order = question.order;
  }
}
