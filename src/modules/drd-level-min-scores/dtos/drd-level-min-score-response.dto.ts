import { DRDLevelMinScore } from '@/entities/drd-level-min-score.entity';
import { Expose } from 'class-transformer';

export default class DrdLevelMinScoreResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  min_score: number;

  @Expose()
  drd_level_uuid: string;

  @Expose()
  drd_level_order: number;

  @Expose()
  drd_topic_item_uuid: string;

  @Expose()
  drd_topic_item_order: number;

  @Expose()
  drd_metric_uuid: string;

  @Expose()
  drd_metric_order: number;
  
  constructor(score: DRDLevelMinScore) {
    this.uuid = score.uuid;
    this.drd_level_uuid = score.drdLevel ? score.drdLevel.uuid : undefined;
    this.min_score = score.min_score;

    if(score.drdLevel) {
      this.drd_level_uuid = score.drdLevel.uuid
      this.drd_level_order = score.drdLevel.order
    }

    if(score.drdTopicItem) {
      this.drd_topic_item_uuid = score.drdTopicItem.uuid
      this.drd_topic_item_order = score.drdTopicItem.order
    }

    if(score.drdMetric) {
      this.drd_metric_uuid = score.drdMetric.uuid
      this.drd_metric_order = score.drdMetric.order
    }
  }
}
