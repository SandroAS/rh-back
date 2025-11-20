import { IsNotEmpty, IsString, IsInt, Min, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateFormQuestionDto } from '@/modules/form-questions/dtos/update-form-question.dto';

export class UpdateFormTopicDto {
  @IsOptional()
  @IsString()
  readonly uuid?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string | null;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly order: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFormQuestionDto)
  readonly questions?: UpdateFormQuestionDto[];
}
