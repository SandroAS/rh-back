import { DRDLevelMinScore } from '@/entities/drd-level-min-score.entity';
import { Expose } from 'class-transformer';

export default class DrdLevelMinScoreResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  drd_level_uuid: string;

  @Expose()
  min_score: number;
  
  constructor(score: DRDLevelMinScore) {
    this.uuid = score.uuid;
    this.drd_level_uuid = score.drdLevel ? score.drdLevel.uuid : undefined;
    this.min_score = score.min_score;
  }
}
