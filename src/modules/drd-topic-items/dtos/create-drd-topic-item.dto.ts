import { IsNotEmpty, IsInt, IsPositive, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDRDLevelMinScoreDto } from '@/modules/drd-level-min-scores/dtos/create-drd-level-min-score.dto';

export class CreateDRDTopicItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateDRDLevelMinScoreDto)
  scoresByLevel: CreateDRDLevelMinScoreDto[];
}
