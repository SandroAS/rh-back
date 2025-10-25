import { IsNotEmpty, IsInt, IsPositive, IsString, IsOptional, IsEnum, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDRDLevelMinScoreDto } from '@/modules/drd-level-min-scores/dtos/create-drd-level-min-score.dto';
import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';


export class CreateDRDMetricDto {
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

  @ArrayMinSize(1, { message: 'As pontuações por nível (scoresByLevel) são obrigatórias para a métrica.' })
  @ValidateNested({ each: true })
  @Type(() => CreateDRDLevelMinScoreDto)
  scoresByLevel: CreateDRDLevelMinScoreDto[];
}