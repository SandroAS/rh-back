import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateFormTopicDto } from '@/modules/form-topics/dtos/update-form-topic.dto';

export class UpdateFormDto {
  @IsNotEmpty()
  @IsString()
  readonly uuid: string;

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
  @Type(() => UpdateFormTopicDto)
  readonly topics?: UpdateFormTopicDto[];
}
