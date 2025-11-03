import { IsNotEmpty, IsInt, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFormAnswerDto } from '@/modules/form-answers/dtos/create-form-answer.dto';

export class CreateFormResponseDto {
  @IsNotEmpty()
  @IsInt()
  readonly form_application_id: number;

  @IsOptional()
  @IsInt()
  readonly evaluation_application_id?: number | null;

  @IsOptional()
  @IsInt()
  readonly user_id?: number | null;

  @IsOptional()
  @IsBoolean()
  readonly is_completed?: boolean;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormAnswerDto)
  readonly answers: CreateFormAnswerDto[];
}
