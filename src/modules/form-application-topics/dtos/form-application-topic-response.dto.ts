import { FormApplicationTopic } from '@/entities/form-application-topic.entity';
import FormApplicationQuestionResponseDto from '@/modules/form-application-questions/dtos/form-application-question-response.dto';
import { Expose, Type } from 'class-transformer';

export class FormApplicationTopicResponseDto {
    
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly description: string | null;

  @Expose()
  readonly order: number;

  @Expose()
  readonly form_application_uuid: string;
  
  @Expose()
  readonly base_form_topic_uuid: string;

  @Expose()
  readonly drd_topic_uuid: string | null;

  @Expose()
  @Type(() => FormApplicationQuestionResponseDto)
  readonly questions: FormApplicationQuestionResponseDto[];

  constructor(topic: FormApplicationTopic) {
      this.uuid = topic.uuid;
      this.title = topic.title;
      this.description = topic.description;
      this.order = topic.order;
      this.questions = [];

      if (topic.questions) {
        this.questions = topic.questions.map(q => new FormApplicationQuestionResponseDto(q));
      }
  }
}
