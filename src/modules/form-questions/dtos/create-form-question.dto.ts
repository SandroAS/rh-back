import { IsNotEmpty, IsString, IsInt, Min, IsEnum, IsBoolean, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFormQuestionOptionDto } from '@/modules/form-question-options/dtos/create-form-question-option.dto';
import { QuestionType } from '@/common/enums/question-type.enum';

export class CreateFormQuestionDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string | null;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  readonly type: QuestionType;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly order: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly is_required: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormQuestionOptionDto)
  readonly options?: CreateFormQuestionOptionDto[];

  @IsOptional()
  @IsString()
  readonly drd_topic_item_uuid?: string | null;
}
