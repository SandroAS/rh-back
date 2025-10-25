import { DRDTopic } from '@/entities/drd-topic.entity';
import { Expose, Type } from 'class-transformer';
import DrdTopicItemResponseDto from '@/modules/drd-topic-items/dtos/drd-topic-item-response.dto'; // Importar novo DTO

export default class DrdTopicResponseDto {
  @Expose() 
  uuid: string; // Manter apenas o UUID
  
  @Expose()
  name: string;

  @Expose()
  order: number;

  @Expose()
  @Type(() => DrdTopicItemResponseDto)
  drdTopicItems: DrdTopicItemResponseDto[];

  constructor(topic: DRDTopic) {
    this.uuid = topic.uuid;
    this.name = topic.name;
    this.order = topic.order;

    this.drdTopicItems = topic.drdTopicItems ? topic.drdTopicItems.map(item => new DrdTopicItemResponseDto(item)) : [];
  }
}
