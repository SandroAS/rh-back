import { IsString, IsNotEmpty, IsOptional, ArrayMinSize, ValidateNested, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { DRDTopicItemDto } from '@/modules/drd-topic-items/dtos/drd-topic-item.dto';

export class DRDTopicDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DRDTopicItemDto)
  items: DRDTopicItemDto[];
}
