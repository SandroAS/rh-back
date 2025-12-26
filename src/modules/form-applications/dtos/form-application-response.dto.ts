import { FormApplication, FormApplicationAccessedFrom } from '@/entities/form-application.entity';
import FormApplicationQuestionResponseDto from '@/modules/form-application-questions/dtos/form-application-question-response.dto';
import { FormApplicationTopicResponseDto } from '@/modules/form-application-topics/dtos/form-application-topic-response.dto';
import { FormResponseResponseDto } from '@/modules/form-responses/dtos/form-response-response.dto';
import { Expose, Type } from 'class-transformer';

export class FormApplicationResponseDto {
    
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly created_at: Date;

  @Expose()
  readonly base_form_id: number;

  @Expose()
  readonly accessed_from: FormApplicationAccessedFrom | null;

  @Expose()
  @Type(() => FormApplicationTopicResponseDto)
  readonly topics: FormApplicationTopicResponseDto[];

  @Expose()
  @Type(() => FormApplicationQuestionResponseDto)
  readonly questions: FormApplicationQuestionResponseDto[];

  @Expose()
  @Type(() => FormResponseResponseDto)
  readonly responses: FormResponseResponseDto[];

  constructor(formApplication: FormApplication) {
      this.uuid = formApplication.uuid;
      this.name = formApplication.name;
      this.description = formApplication.description;
      this.created_at = formApplication.created_at;
      this.base_form_id = formApplication.base_form_id;
      this.accessed_from = formApplication.accessed_from;
      this.topics = [];

      if (formApplication.applicationTopics) {
        this.topics = formApplication.applicationTopics.map(topic => new FormApplicationTopicResponseDto(topic));
      }

      if (formApplication.questions) {
        this.questions = formApplication.questions.map(question => new FormApplicationQuestionResponseDto(question));
      }

      if (formApplication.responses) {
        this.responses = formApplication.responses.map(response => new FormResponseResponseDto(response));
      }
  }
}