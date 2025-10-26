import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsPositive, IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateDRDLevelMinScoreDto {
  @IsOptional()
  @IsString()
  uuid?: string;

  @IsOptional()
  @IsString()
  drd_level_uuid?: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  drd_level_order: number;

  @IsOptional()
  @IsString()
  drd_topic_item_uuid?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  drd_topic_item_order?: number;

  @IsOptional()
  @IsString()
  drd_metric_uuid?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  drd_metric_order?: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'min_score deve ser um valor numérico válido.' })
  @IsPositive({ message: 'min_score deve ser um número positivo.' })
  min_score: number;
}
