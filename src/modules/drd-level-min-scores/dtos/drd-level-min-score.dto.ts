import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class DRDLevelMinScoreDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  drd_level_id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  min_score: number;
}
