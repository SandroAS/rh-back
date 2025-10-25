import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDTopic } from '@/entities/drd-topic.entity';
import { DrdTopicItemsService } from '../drd-topic-items/drd-topic-items.service';
import { CreateDRDTopicDto } from './dtos/create-drd-topic.dto';
import { LevelMap } from '@/common/types/level-map.type';
import { v4 as uuidv4 } from 'uuid';

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
    topicsDtos: CreateDRDTopicDto[],
    levelMap: LevelMap,
    manager?: EntityManager,
  ): Promise<void> {
    try {
      for (const topicDto of topicsDtos) {
        const newTopic = manager.create(DRDTopic, { 
          ...topicDto, 
          drd_id: drdId,
          uuid: uuidv4()
        });
        const savedTopic = await manager.save(DRDTopic, newTopic);

        await this.drdTopicItemsService.createManyInTransaction(
          savedTopic.id, 
          topicDto.drdTopicItems,
          levelMap,
          manager,
        );
      }
      
    } catch (error) {
      console.error('Erro ao salvar DRD Topics e Items na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Tópicos e Itens de DRD.');
    }
  }
}
