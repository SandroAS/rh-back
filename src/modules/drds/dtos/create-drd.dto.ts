import { IsNotEmpty, IsInt, IsPositive, IsUUID, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDRDLevelDto } from '@/modules/drd-levels/dtos/create-drd-level.dto';
import { CreateDRDMetricDto } from '@/modules/drd-metrics/dtos/create-drd-metric.dto';
import { CreateDRDTopicDto } from '@/modules/drd-topics/dtos/create-drd-topic.dto';

export class CreateDRDDto {
  @IsNotEmpty()
  @IsUUID()
  job_position_uuid: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  rate: number;

  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreateDRDLevelDto)
  levels: CreateDRDLevelDto[];

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateDRDMetricDto)
  metrics: CreateDRDMetricDto[];

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateDRDTopicDto)
  topics: CreateDRDTopicDto[];
}
