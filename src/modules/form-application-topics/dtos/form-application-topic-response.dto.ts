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
  readonly created_at: Date;

  @Expose()
  readonly form_application_uuid: string;
  
  @Expose()
  readonly base_form_topic_uuid: string;

  @Expose()
  readonly drd_topic_uuid: string | null;

  // Relação: Perguntas da Aplicação associadas a este tópico
  @Expose()
  @Type(() => FormApplicationQuestionResponseDto)
  readonly questions: FormApplicationQuestionResponseDto[];

  constructor(topic: FormApplicationTopic) {
      this.uuid = topic.uuid;
      this.title = topic.title;
      this.description = topic.description;
      this.order = topic.order;
      this.created_at = topic.created_at;

      // Mapeamento de UUIDs/IDs
      this.form_application_uuid = (topic.application as any)?.uuid || '';
    //   this.base_form_topic_id = topic.base_form_topic_id;
    //   this.drd_topic_id = topic.drd_topic_id;

      // Mapeamento de Perguntas
      if (topic.questions) {
          this.questions = topic.questions.map(q => new FormApplicationQuestionResponseDto(q as any));
      } else {
          this.questions = [];
      }
  }
}