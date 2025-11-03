import { IsNotEmpty, IsInt, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFormAnswerMultiOptionDto } from '@/modules/form-answer-multi-options/dtos/create-form-answer-multi-option.dto';

export class CreateFormAnswerDto {
  @IsNotEmpty()
  @IsInt()
  readonly application_question_id: number;

  @IsOptional()
  @IsString()
  readonly text_value?: string | null;

  @IsOptional()
  @IsInt()
  readonly application_option_id?: number | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormAnswerMultiOptionDto)
  readonly multiOptions?: CreateFormAnswerMultiOptionDto[]; 
}
