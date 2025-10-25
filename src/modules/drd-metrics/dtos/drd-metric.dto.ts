import { IsString, IsNotEmpty, IsOptional, ValidateNested, ArrayMinSize, IsInt, IsPositive, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { DRDLevelMinScoreDto } from '@/modules/drd-level-min-scores/dtos/drd-level-min-score.dto';
import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';

export class DRDMetricDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  classification?: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @IsNotEmpty()
  @IsEnum(MetricType)
  type: MetricType;

  @IsNotEmpty()
  @IsEnum(MetricPrefix)
  prefix: MetricPrefix;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DRDLevelMinScoreDto)
  min_scores: DRDLevelMinScoreDto[];
}
