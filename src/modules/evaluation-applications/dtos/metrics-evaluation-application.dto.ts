import { EvaluationType } from '@/entities/evaluation-application.entity';
import { IsOptional, IsString, IsEnum, IsDateString, IsUUID } from 'class-validator';

export class EvaluationApplicationFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(EvaluationType)
  type?: EvaluationType;

  @IsOptional()
  @IsUUID()
  evaluated_user_uuid?: string;

  @IsOptional()
  @IsUUID()
  submitted_user_uuid?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
