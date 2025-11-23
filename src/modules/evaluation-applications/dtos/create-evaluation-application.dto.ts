import { EvaluationType } from '@/entities/evaluation-application.entity';
import { IsNotEmpty, IsEnum, IsDateString, IsString } from 'class-validator';

export class CreateEvaluationApplicationDto {
  @IsNotEmpty()
  @IsString()
  readonly evaluation_uuid: string;

  @IsNotEmpty()
  @IsString()
  readonly form_uuid: string;

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
  @IsString()
  readonly evaluated_user_uuid: string;

  @IsNotEmpty()
  @IsString()
  readonly submitting_user_uuid: string;
}
