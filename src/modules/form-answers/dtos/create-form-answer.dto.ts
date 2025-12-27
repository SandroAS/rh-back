import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFormAnswerMultiOptionDto } from '@/modules/form-answer-multi-options/dtos/create-form-answer-multi-option.dto';

export class CreateFormAnswerDto {
  @IsNotEmpty()
  @IsString()
  readonly application_question_uuid: string;

  @IsOptional()
  @IsString()
  readonly text_value?: string | null;

  @IsOptional()
  @IsNumber({}, { message: 'O valor deve ser um número válido' })
  @Type(() => Number)
  readonly number_value?: number | null;

  @IsOptional()
  @IsString()
  readonly application_option_uuid?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormAnswerMultiOptionDto)
  readonly multiOptions?: CreateFormAnswerMultiOptionDto[]; 
}
