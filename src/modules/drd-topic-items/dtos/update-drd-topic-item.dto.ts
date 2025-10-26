import { IsNotEmpty, IsInt, IsPositive, IsString, ValidateNested, ArrayMinSize, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDRDLevelMinScoreDto } from '@/modules/drd-level-min-scores/dtos/update-drd-level-min-score.dto';

export class UpdateDRDTopicItemDto {
  @IsOptional()
  @IsString()
  uuid?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateDRDLevelMinScoreDto)
  scoresByLevel: UpdateDRDLevelMinScoreDto[];
}
