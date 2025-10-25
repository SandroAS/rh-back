import { DRDMetrics, MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { Expose, Type } from 'class-transformer';
import DrdLevelMinScoreResponseDto from '@/modules/drd-level-min-scores/dtos/drd-level-min-score-response.dto';

export default class DrdMetricResponseDto {
  @Expose() 
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  type: MetricType;

  @Expose()
  prefix: MetricPrefix;

  @Expose()
  classification: string;
  
  @Expose()
  @Type(() => DrdLevelMinScoreResponseDto)
  scoresByLevel: DrdLevelMinScoreResponseDto[];

  constructor(metric: DRDMetrics) {
    this.uuid = metric.uuid;
    this.name = metric.name;
    this.type = metric.type;
    this.prefix = metric.prefix;
    this.classification = metric.classification;

    this.scoresByLevel = metric.minScores ? metric.minScores.map(score => new DrdLevelMinScoreResponseDto(score)) : [];
  }
}
