import { 
  EvaluationApplicationStatus, 
  EvaluationType, 
  EvaluationRecurrence 
} from '@/entities/evaluation-application.entity';
import { Type } from 'class-transformer';
import { 
  IsNotEmpty, 
  IsEnum, 
  IsDateString, 
  IsString, 
  IsArray, 
  ValidateNested, 
  IsOptional, 
  IsInt, 
  Min 
} from 'class-validator';
import { EvaluationApplicationItemDto } from './evaluation-application-item.dto';

export class CreateEvaluationApplicationDto {
  @IsOptional()
  @IsString()
  readonly evaluation_uuid: string;

  @IsNotEmpty()
  @IsEnum(EvaluationApplicationStatus)
  readonly status: EvaluationApplicationStatus;

  @IsNotEmpty()
  @IsDateString()
  readonly started_date: string;

  @IsOptional()
  @IsDateString()
  readonly expiration_date: string | null;

  @IsOptional()
  @IsEnum(EvaluationRecurrence)
  readonly recurrence: EvaluationRecurrence | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly expiration_days: number | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EvaluationApplicationItemDto)
  readonly applications: EvaluationApplicationItemDto[];
}
