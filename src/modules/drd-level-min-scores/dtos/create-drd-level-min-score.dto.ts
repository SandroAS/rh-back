import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsPositive, IsNumberString, IsOptional, IsNumber } from 'class-validator';

export class CreateDRDLevelMinScoreDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  drd_level_order: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  drd_topic_item_order?: number; 

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