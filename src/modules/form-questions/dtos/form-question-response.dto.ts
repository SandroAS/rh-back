import { QuestionType } from '@/common/enums/question-type.enum';
import { FormQuestion } from '@/entities/form-question.entity';
import { FormQuestionOptionResponseDto } from '@/modules/form-question-options/dtos/form-question-option-response.dto';
import { Expose, Type } from 'class-transformer';

export class FormQuestionResponseDto {
  
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly type: QuestionType; 

  @Expose()
  readonly title: string;

  @Expose()
  readonly description: string | null;
  
  @Expose()
  readonly order: number;

  @Expose()
  @Type(() => FormQuestionOptionResponseDto)
  readonly options: FormQuestionOptionResponseDto[];
  
  constructor(formQuestion: FormQuestion) {
    this.uuid = formQuestion.uuid;
    this.type = formQuestion.type;
    this.title = formQuestion.title;
    this.description = formQuestion.description;
    this.order = formQuestion.order;
    this.options = [];

    if (formQuestion.options) {
      this.options = formQuestion.options.map(
        (option) => new FormQuestionOptionResponseDto(option),
      );
    }
  }
}
