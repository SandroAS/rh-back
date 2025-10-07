import { IsString, IsNotEmpty, IsOptional, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { DRDLevelMinScoreDto } from '@/modules/drd-level-min-scores/dtos/drd-level-min-score.dto';

export class DRDMetricDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  classification?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DRDLevelMinScoreDto)
  min_scores: DRDLevelMinScoreDto[];
}
