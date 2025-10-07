import { IsNotEmpty, IsInt, IsPositive, IsUUID, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DRDLevelDto } from '@/modules/drd-levels/dtos/drd-level.dto';
import { DRDMetricDto } from '@/modules/drd-metrics/dtos/drd-metric.dto';
import { DRDTopicDto } from '@/modules/drd-topics/dtos/drd-topic.dto';

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
  @Type(() => DRDLevelDto)
  levels: DRDLevelDto[];

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DRDMetricDto)
  metrics: DRDMetricDto[];

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DRDTopicDto)
  topics: DRDTopicDto[];
}
