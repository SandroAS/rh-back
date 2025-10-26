import { IsInt, IsPositive, IsUUID, ArrayMinSize, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDRDLevelDto } from '@/modules/drd-levels/dtos/update-drd-level.dto';
import { UpdateDRDMetricDto } from '@/modules/drd-metrics/dtos/update-drd-metric.dto';
import { UpdateDRDTopicDto } from '@/modules/drd-topics/dtos/update-drd-topic.dto';

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
  @Type(() => UpdateDRDLevelDto)
  levels?: UpdateDRDLevelDto[];

  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateDRDMetricDto)
  metrics?: UpdateDRDMetricDto[];

  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateDRDTopicDto)
  topics?: UpdateDRDTopicDto[];
}
