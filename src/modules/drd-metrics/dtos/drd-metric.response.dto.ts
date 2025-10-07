import { DRDMetrics } from '@/entities/drd-metric.entity';
import { Expose } from 'class-transformer';

export default class DrdMetricResponseDto {
  @Expose() id: number;
  @Expose() uuid: string;
  @Expose() name: string;
  @Expose() classification: string;
  
  constructor(metric: DRDMetrics) {
    this.id = metric.id;
    this.uuid = metric.uuid;
    this.name = metric.name;
    this.classification = metric.classification;
  }
}
