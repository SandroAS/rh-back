import { IsNotEmpty, IsString, IsInt, Min, IsEnum, IsBoolean, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '@/entities/form-question.entity';
import { CreateFormQuestionOptionDto } from '@/modules/form-question-options/dtos/create-form-question-option.dto';

export class CreateFormQuestionDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  readonly type: QuestionType;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly order: number;

  @IsOptional()
  @IsBoolean()
  readonly is_required?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormQuestionOptionDto)
  readonly options?: CreateFormQuestionOptionDto[];
  
  @IsNotEmpty()
  @IsInt()
  readonly form_id: number;
}
