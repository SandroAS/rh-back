import { FormTopic } from '@/entities/form-topic.entity';
import { FormQuestionResponseDto } from '@/modules/form-questions/dtos/form-question-response.dto';
import { Expose, Type } from 'class-transformer';

export class FormTopicResponseDto {
  
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly description: string | null;

  @Expose()
  readonly order: number;
  
  @Expose()
  @Type(() => FormQuestionResponseDto)
  readonly questions: FormQuestionResponseDto[];
  
  constructor(formTopic: FormTopic) {
    this.uuid = formTopic.uuid;
    this.title = formTopic.title;
    this.description = formTopic.description;
    this.order = formTopic.order;
    this.questions = [];

    if (formTopic.questions) {
      this.questions = formTopic.questions.map(
        (question) => new FormQuestionResponseDto(question),
      );
    }
  }
}
