import { QuestionType } from '@/common/enums/question-type.enum';
import { FormApplicationQuestion } from '@/entities/form-application-question.entity';
import FormApplicationQuestionOptionResponseDto from '@/modules/form-application-question-options/dtos/form-application-question-option-response.dto';
import { Expose, Type } from 'class-transformer';

export default class FormApplicationQuestionResponseDto {
  @Expose()
  uuid: string;

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
  @Type(() => FormApplicationQuestionOptionResponseDto)
  readonly options: FormApplicationQuestionOptionResponseDto[];

  constructor(question: FormApplicationQuestion) {
    if (!question) return;
    this.uuid = question.uuid;
    this.title = question.title;
    this.description = question.description;
    this.type = question.type;
    this.is_required = question.is_required;
    this.order = question.order;
    this.options = [];

    if (question.options) {
      this.options = question.options.map(option => new FormApplicationQuestionOptionResponseDto(option));
    }
  }
}
