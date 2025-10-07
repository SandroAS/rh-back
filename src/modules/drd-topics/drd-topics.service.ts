import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDTopic } from '@/entities/drd-topic.entity';
import { DrdTopicItemsService } from '../drd-topic-items/drd-topic-items.service';
import { DRDTopicDto } from './dtos/drd-topic.dto';

@Injectable()
export class DrdTopicsService extends BaseService<DRDTopic> {
  constructor(
    @InjectRepository(DRDTopic)
    private drdTopicRepository: Repository<DRDTopic>,
    private drdTopicItemsService: DrdTopicItemsService, 
  ) {
    super(drdTopicRepository);
  }

  async createTopicsAndItemsInTransaction(
    drdId: number,
    topicsDtos: DRDTopicDto[],
    manager?: EntityManager,
  ): Promise<void> {
    try {
      for (const topicDto of topicsDtos) {
        const newTopic = manager.create(DRDTopic, { 
          ...topicDto, 
          drd_id: drdId,
        });
        const savedTopic = await manager.save(DRDTopic, newTopic);

        await this.drdTopicItemsService.createManyInTransaction(
          savedTopic.id, 
          topicDto.items,
          manager,
        );
      }
      
    } catch (error) {
      console.error('Erro ao salvar DRD Topics e Items na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Tópicos e Itens de DRD.');
    }
  }
}
