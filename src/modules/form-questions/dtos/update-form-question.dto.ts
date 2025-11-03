import { QuestionType } from '@/entities/form-question.entity';
import { CreateFormQuestionOptionDto } from '@/modules/form-question-options/dtos/create-form-question-option.dto';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class UpdateFormQuestionDto {
  @IsOptional()
  @IsString()
  readonly text?: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  readonly type: QuestionType;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly order?: number;

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
