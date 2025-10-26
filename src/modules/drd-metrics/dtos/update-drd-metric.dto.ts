import { IsNotEmpty, IsInt, IsPositive, IsString, IsOptional, IsEnum, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDRDLevelMinScoreDto } from '@/modules/drd-level-min-scores/dtos/update-drd-level-min-score.dto';
import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';


export class UpdateDRDMetricDto {
  @IsOptional()
  @IsString()
  uuid?: string;

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

  @ArrayMinSize(1, { message: 'As pontuações por nível são obrigatórias para a métrica.' })
  @ValidateNested({ each: true })
  @Type(() => UpdateDRDLevelMinScoreDto)
  scoresByLevel: UpdateDRDLevelMinScoreDto[];
}