import { Expose, Type } from 'class-transformer';
import { DRD } from '@/entities/drd.entity'; 
import DrdLevelResponseDto from '@/modules/drd-levels/dtos/drd-level-response.dto';
import DrdMetricResponseDto from '@/modules/drd-metrics/dtos/drd-metric.response.dto';
import DrdTopicResponseDto from '@/modules/drd-topics/dtos/drd-topic-response.dto';

export class DRDResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  job_position_id: number;

  @Expose()
  rate: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
  
  @Expose()
  @Type(() => DrdLevelResponseDto)
  levels: DrdLevelResponseDto[];

  @Expose()
  @Type(() => DrdMetricResponseDto)
  metrics: DrdMetricResponseDto[];

  @Expose()
  @Type(() => DrdTopicResponseDto)
  topics: DrdTopicResponseDto[];

  constructor(drd: DRD) {
    this.uuid = drd.uuid;
    this.job_position_id = drd.job_position_id;
    this.rate = drd.rate;
    this.created_at = drd.created_at;
    this.updated_at = drd.updated_at;

    this.levels = drd.levels ? drd.levels.map(level => new DrdLevelResponseDto(level)) : [];
    this.metrics = drd.metrics ? drd.metrics.map(metric => new DrdMetricResponseDto(metric)) : [];
    this.topics = drd.topics ? drd.topics.map(topic => new DrdTopicResponseDto(topic)) : [];
  }
}
