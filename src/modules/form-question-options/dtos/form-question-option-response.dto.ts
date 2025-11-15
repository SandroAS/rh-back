import { FormQuestionOption } from '@/entities/form-question-option.entity';
import { Expose } from 'class-transformer';

/**
 * DTO (Data Transfer Object) para representar uma Opção de Resposta de uma Questão.
 */
export class FormQuestionOptionResponseDto {
  
  @Expose()
  readonly id: number;

  @Expose()
  readonly question_id: number;

  @Expose()
  readonly text: string;

  @Expose()
  readonly order: number;
  
  @Expose()
  readonly created_at: Date;

  constructor(entity: FormQuestionOption) {
    Object.assign(this, entity);
  }
}