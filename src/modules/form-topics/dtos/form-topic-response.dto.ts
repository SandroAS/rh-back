import { FormTopic } from '@/entities/form-topic.entity';
import { FormQuestionResponseDto } from '@/modules/form-questions/dtos/form-question-response.dto';
import { Expose, Type } from 'class-transformer';

/**
 * DTO (Data Transfer Object) para representar a resposta de um Tópico do Formulário.
 * Usado para formatar a saída de dados da API.
 */
export class FormTopicResponseDto {
  
  @Expose()
  readonly id: number;

  @Expose()
  readonly form_id: number;

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
  @Type(() => FormQuestionResponseDto)
  readonly questions: FormQuestionResponseDto[];
  
  constructor(entity: FormTopic) {
    Object.assign(this, entity);

    if (entity.questions) {
      this.questions = entity.questions.map(
        (question) => new FormQuestionResponseDto(question),
      );
    } else {
      this.questions = [];
    }
  }
}