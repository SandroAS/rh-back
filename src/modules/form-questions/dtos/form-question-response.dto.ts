import { FormQuestion, QuestionType } from '@/entities/form-question.entity';
import { FormQuestionOptionResponseDto } from '@/modules/form-question-options/dtos/form-question-option-response.dto';
import { Expose, Type } from 'class-transformer';

/**
 * DTO (Data Transfer Object) para representar a resposta de uma Questão do Formulário.
 * Pode ser aninhado sob FormResponseDto ou FormTopicResponseDto.
 */
export class FormQuestionResponseDto {
  
  @Expose()
  readonly id: number;

  @Expose()
  readonly form_id: number | null;
  
  @Expose()
  readonly topic_id: number | null;

  @Expose()
  readonly type: QuestionType; 

  @Expose()
  readonly title: string;

  @Expose()
  readonly description: string | null;
  
  @Expose()
  readonly order: number;

  @Expose()
  readonly created_at: Date;

  @Expose()
  readonly updated_at: Date;

  @Expose()
  @Type(() => FormQuestionOptionResponseDto)
  readonly options: FormQuestionOptionResponseDto[];
  
  constructor(entity: FormQuestion) {
    Object.assign(this, entity);

    if (entity.options) {
      this.options = entity.options.map(
        (option) => new FormQuestionOptionResponseDto(option),
      );
    } else {
      this.options = [];
    }
  }
}