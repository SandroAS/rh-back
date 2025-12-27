import { IsNotEmpty, IsInt, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFormAnswerDto } from '@/modules/form-answers/dtos/create-form-answer.dto';

export class CreateFormResponseDto {
  @IsOptional()
  @IsBoolean()
  readonly is_completed?: boolean;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormAnswerDto)
  readonly answers: CreateFormAnswerDto[];
}
