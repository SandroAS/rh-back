import { QuestionType } from '@/common/enums/question-type.enum';
import { UpdateFormQuestionOptionDto } from '@/modules/form-question-options/dtos/update-form-question-option.dto';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class UpdateFormQuestionDto {
  @IsOptional()
  @IsString()
  readonly uuid?: string;

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

  @IsNotEmpty()
  @IsBoolean()
  readonly is_required: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFormQuestionOptionDto)
  readonly options?: UpdateFormQuestionOptionDto[];
  
  @IsNotEmpty()
  @IsInt()
  readonly form_id: number;
}
