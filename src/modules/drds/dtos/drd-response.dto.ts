import { Expose, Type } from 'class-transformer';
import { DRD } from '@/entities/drd.entity'; 
import DrdLevelResponseDto from '@/modules/drd-levels/dtos/drd-level-response.dto';
import DrdMetricResponseDto from '@/modules/drd-metrics/dtos/drd-metric.response.dto';
import DrdTopicResponseDto from '@/modules/drd-topics/dtos/drd-topic-response.dto';

export class DRDResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  job_position_uuid: string; 

  @Expose()
  rate: number;
  
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
    this.rate = drd.rate;  

    this.job_position_uuid = drd.jobPosition ? drd.jobPosition.uuid : drd.job_position_id.toString(); 

    this.levels = drd.levels ? drd.levels.map(level => new DrdLevelResponseDto(level)) : [];
    this.metrics = drd.metrics ? drd.metrics.map(metric => new DrdMetricResponseDto(metric)) : [];
    this.topics = drd.topics ? drd.topics.map(topic => new DrdTopicResponseDto(topic)) : [];
  }
}
