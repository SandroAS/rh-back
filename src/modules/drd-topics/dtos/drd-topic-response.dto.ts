import { DRDTopic } from '@/entities/drd-topic.entity';
import { Expose } from 'class-transformer';

export default class DrdTopicResponseDto {
  @Expose() id: number;
  @Expose() uuid: string;
  @Expose() name: string;
  @Expose() order: number;

  constructor(topic: DRDTopic) {
    this.id = topic.id;
    this.uuid = topic.uuid;
    this.name = topic.name;
    this.order = topic.order;
  }
}
