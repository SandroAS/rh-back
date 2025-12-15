import { EvaluationApplicationStatus, EvaluationType } from '@/entities/evaluation-application.entity';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsDateString, IsString, IsArray, ValidateNested } from 'class-validator';
import { EvaluationApplicationItemDto } from './evaluation-application-item.dto';

export class CreateEvaluationApplicationDto {
  @IsNotEmpty()
  @IsString()
  readonly evaluation_uuid: string;

  @IsNotEmpty()
  @IsEnum(EvaluationType)
  readonly type: EvaluationType;

  @IsNotEmpty()
  @IsEnum(EvaluationApplicationStatus)
  readonly status: EvaluationApplicationStatus;

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

  @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EvaluationApplicationItemDto)
    readonly applications: EvaluationApplicationItemDto[];
}
