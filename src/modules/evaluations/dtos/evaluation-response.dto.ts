import { Evaluation } from '@/entities/evaluation.entity';
import { Expose } from 'class-transformer';

export class EvaluationResponseDto {
  
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly rate: number;
  
  constructor(entity: Evaluation) {
    Object.assign(this, entity);
  }
}
