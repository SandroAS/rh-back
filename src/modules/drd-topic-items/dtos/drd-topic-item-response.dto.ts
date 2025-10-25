// @/modules/drd-topic-items/dtos/drd-topic-item-response.dto.ts

import { DRDTopicItem } from '@/entities/drd-topic-item.entity';
import { Expose, Type } from 'class-transformer';
import DrdLevelMinScoreResponseDto from '@/modules/drd-level-min-scores/dtos/drd-level-min-score-response.dto';

export default class DrdTopicItemResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  order: number;
  
  @Expose()
  @Type(() => DrdLevelMinScoreResponseDto)
  scoresByLevel: DrdLevelMinScoreResponseDto[];
  
  constructor(item: DRDTopicItem) {
    this.uuid = item.uuid;
    this.name = item.name;
    this.order = item.order;

    this.scoresByLevel = item.minScores ? item.minScores.map(score => new DrdLevelMinScoreResponseDto(score)) : [];
  }
}