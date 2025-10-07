import { IsInt, IsPositive, IsUUID, ArrayMinSize, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { DRDLevelDto } from '@/modules/drd-levels/dtos/drd-level.dto';
import { DRDMetricDto } from '@/modules/drd-metrics/dtos/drd-metric.dto';
import { DRDTopicDto } from '@/modules/drd-topics/dtos/drd-topic.dto';

export class UpdateDRDDto {
  @IsOptional()
  @IsUUID()
  job_position_uuid?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  rate?: number;

  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DRDLevelDto)
  levels?: DRDLevelDto[];

  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DRDMetricDto)
  metrics?: DRDMetricDto[];

  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DRDTopicDto)
  topics?: DRDTopicDto[];
}
