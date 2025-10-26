import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDTopic } from '@/entities/drd-topic.entity';
import { DrdTopicItemsService } from '../drd-topic-items/drd-topic-items.service';
import { CreateDRDTopicDto } from './dtos/create-drd-topic.dto';
import { LevelMap } from '@/common/types/level-map.type';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDRDTopicDto } from './dtos/update-drd-topic.dto';
import { DRDTopicItem } from '@/entities/drd-topic-item.entity';
import { DRDLevelMinScore } from '@/entities/drd-level-min-score.entity';

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

  async syncTopicsAndItemsInTransaction(
    drdId: number,
    incomingTopics: UpdateDRDTopicDto[],
    existingTopics: DRDTopic[],
    levelMap: Map<number, { id: number, uuid: string }>,
    manager: EntityManager,
  ): Promise<DRDTopic[]> {

    const existingTopicUuids = existingTopics.map(t => t.uuid);
    const incomingTopicUuids = incomingTopics.map(t => t.uuid).filter(uuid => !!uuid);

    const topicsToDeleteUuids = existingTopicUuids.filter(uuid => !incomingTopicUuids.includes(uuid));

    if (topicsToDeleteUuids.length > 0) {
      await manager.delete(DRDTopic, { drd_id: drdId, uuid: In(topicsToDeleteUuids) });
    }

    const savedTopics: DRDTopic[] = [];
    for (const incomingTopic of incomingTopics) {
      const topicUuid = incomingTopic.uuid || uuidv4();

      const topicToSave = manager.create(DRDTopic, {
        id: existingTopics.find(t => t.uuid === topicUuid)?.id,
        uuid: topicUuid,
        drd_id: drdId,
        name: incomingTopic.name,
        order: incomingTopic.order,
      });
      const savedTopic = await manager.save(DRDTopic, topicToSave);
        
      const existingTopic = existingTopics.find(t => t.uuid === topicUuid);
      const existingItems = existingTopic ? existingTopic.drdTopicItems : [];
        
      const existingItemUuids = existingItems.map(item => item.uuid);
      const incomingItemUuids = incomingTopic.drdTopicItems.map(item => item.uuid).filter(uuid => !!uuid);

      const itemsToDeleteUuids = existingItemUuids.filter(uuid => !incomingItemUuids.includes(uuid));

      if (itemsToDeleteUuids.length > 0) {
        await manager.delete(DRDTopicItem, { 
          drd_topic_id: savedTopic.id, 
          uuid: In(itemsToDeleteUuids) 
        });
      }

      const savedItems: DRDTopicItem[] = [];
      for (const incomingItem of incomingTopic.drdTopicItems) {
        const itemUuid = incomingItem.uuid || uuidv4();

        const itemToSave = manager.create(DRDTopicItem, {
          id: existingItems.find(item => item.uuid === itemUuid)?.id,
          uuid: itemUuid,
          drd_topic_id: savedTopic.id,
          name: incomingItem.name,
          order: incomingItem.order,
        });
        const savedItem = await manager.save(DRDTopicItem, itemToSave);

        const existingItem = existingItems.find(item => item.uuid === itemUuid);
        const existingScores = existingItem ? existingItem.minScores : [];

        const existingScoreUuids = existingScores.map(score => score.uuid);
        const incomingScoreUuids = incomingItem.scoresByLevel.map(score => score.uuid).filter(uuid => !!uuid);

        const scoresToDeleteUuids = existingScoreUuids.filter(uuid => !incomingScoreUuids.includes(uuid));

        if (scoresToDeleteUuids.length > 0) {
          await manager.delete(DRDLevelMinScore, { uuid: In(scoresToDeleteUuids) });
        }

        const scoresToUpsert = incomingItem.scoresByLevel.map(scoreDto => {
          const level = levelMap.get(scoreDto.drd_level_order);
          if (!level) {
            throw new InternalServerErrorException(`Nível de ordem ${scoreDto.drd_level_order} não mapeado.`);
          }

          const existingScore = existingScores.find(s => s.uuid === scoreDto.uuid);

          return manager.create(DRDLevelMinScore, {
            id: existingScore?.id,
            uuid: scoreDto.uuid || uuidv4(),
            drd_topic_item_id: savedItem.id,
            drd_level_id: level.id,
            min_score: scoreDto.min_score,
          });
        });

        const savedMinScores = await manager.save(DRDLevelMinScore, scoresToUpsert);

        savedItem.minScores = savedMinScores;
        savedItems.push(savedItem);
      }

      savedTopic.drdTopicItems = savedItems;
      savedTopics.push(savedTopic);
    }

    return savedTopics;
  }
}
