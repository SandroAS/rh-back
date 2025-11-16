import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateFormTopicDto } from '@/modules/form-topics/dtos/create-form-topic.dto';

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
  @Type(() => CreateFormTopicDto)
  readonly topics?: CreateFormTopicDto[];
}
