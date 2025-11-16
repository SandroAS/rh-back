import { IsNotEmpty, IsString, IsOptional, ValidateNested, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFormTopicDto } from '@/modules/form-topics/dtos/create-form-topic.dto';

export class CreateFormDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsInt()
  readonly account_id: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormTopicDto)
  readonly topics?: CreateFormTopicDto[];
}
