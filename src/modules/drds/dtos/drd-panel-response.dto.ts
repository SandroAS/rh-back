import { Expose, Type } from 'class-transformer';
import { DRD } from '@/entities/drd.entity';
import DrdTopicResponseDto from '@/modules/drd-topics/dtos/drd-topic-response.dto';
import DrdLevelResponseDto from '@/modules/drd-levels/dtos/drd-level-response.dto';
import DrdMetricResponseDto from '@/modules/drd-metrics/dtos/drd-metric.response.dto';

export class DrdPanelResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  rate: number;

  @Expose()
  @Type(() => DrdTopicResponseDto)
  topics: DrdTopicResponseDto[];

  @Expose()
  @Type(() => DrdLevelResponseDto)
  levels: DrdLevelResponseDto[];

  @Expose()
  @Type(() => DrdMetricResponseDto)
  metrics: DrdMetricResponseDto[];

  constructor(drd: DRD) {
    this.uuid = drd.uuid;
    this.rate = drd.rate;
    this.topics = (drd.topics || []).map((t) => new DrdTopicResponseDto(t));
    this.levels = (drd.levels || []).map((l) => new DrdLevelResponseDto(l));
    this.metrics = (drd.metrics || []).map((m) => new DrdMetricResponseDto(m));
  }
}
