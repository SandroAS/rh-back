import { EvaluationType } from '@/entities/evaluation-application.entity';
import { IsNotEmpty, IsInt, IsEnum, IsDateString } from 'class-validator';

export class CreateEvaluationApplicationDto {
  @IsNotEmpty()
  @IsInt()
  readonly evaluation_id: number;

  @IsNotEmpty()
  @IsInt()
  readonly form_id: number;

  @IsNotEmpty()
  @IsEnum(EvaluationType)
  readonly type: EvaluationType;

  @IsNotEmpty()
  @IsDateString()
  readonly started_date: string;

  @IsNotEmpty()
  @IsDateString()
  readonly expiration_date: string;

  @IsNotEmpty()
  @IsInt()
  readonly evaluated_user_id: number;

  @IsNotEmpty()
  @IsInt()
  readonly submitting_user_id: number;
}
