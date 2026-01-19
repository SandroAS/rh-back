import { EvaluationRecurrence } from '@/entities/evaluation-application.entity';
import { IsDateString, IsOptional, IsEnum, IsInt, Min } from 'class-validator';

export class UpdateEvaluationApplicationDto {
  @IsOptional()
  @IsDateString()
  readonly started_date?: string;

  @IsOptional()
  @IsDateString()
  readonly expiration_date?: string | null;

  @IsOptional()
  @IsEnum(EvaluationRecurrence)
  readonly recurrence?: EvaluationRecurrence | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly expiration_days?: number | null;
}
