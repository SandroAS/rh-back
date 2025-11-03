import { Type } from 'class-transformer';
import { CreateFormQuestionDto } from '@/modules/form-questions/dtos/create-form-question.dto';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateFormDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsInt()
  readonly account_id: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormQuestionDto)
  readonly questions?: CreateFormQuestionDto[];
}
