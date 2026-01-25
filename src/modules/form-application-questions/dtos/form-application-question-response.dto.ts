import { QuestionType } from '@/common/enums/question-type.enum';
import { FormApplicationQuestion } from '@/entities/form-application-question.entity';
import FormApplicationQuestionOptionResponseDto from '@/modules/form-application-question-options/dtos/form-application-question-option-response.dto';
import { FormApplicationTopicResponseDto } from '@/modules/form-application-topics/dtos/form-application-topic-response.dto';
import { Expose, Type } from 'class-transformer';

export default class FormApplicationQuestionResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  base_question_id: number;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  @Expose()
  type: QuestionType;

  @Expose()
  is_required: boolean;

  @Expose()
  order: number;

  @Expose()
  @Type(() => FormApplicationTopicResponseDto)
  readonly applicationTopic: FormApplicationTopicResponseDto;

  @Expose()
  @Type(() => FormApplicationQuestionOptionResponseDto)
  readonly options: FormApplicationQuestionOptionResponseDto[];

  constructor(question: FormApplicationQuestion) {
    if (!question) return;
    this.uuid = question.uuid;
    this.base_question_id = question.base_question_id;
    this.title = question.title;
    this.description = question.description;
    this.type = question.type;
    this.is_required = question.is_required;
    this.order = question.order;
    this.options = [];
    this.applicationTopic = null;

    if (question.topic) {
      this.applicationTopic = new FormApplicationTopicResponseDto(question.topic);
    }

    if (question.options) {
      this.options = question.options.map(option => new FormApplicationQuestionOptionResponseDto(option));
    }
  }
}
