import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDTopicItem } from '@/entities/drd-topic-item.entity';
import { CreateDRDTopicItemDto } from './dtos/create-drd-topic-item.dto'; 
import { DrdLevelMinScoresService } from '../drd-level-min-scores/drd-level-min-scores.service';
import { LevelMap } from '@/common/types/level-map.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DrdTopicItemsService extends BaseService<DRDTopicItem> {
  constructor(
    @InjectRepository(DRDTopicItem)
    private drdTopicItemRepository: Repository<DRDTopicItem>,
    private drdLevelMinScoresService: DrdLevelMinScoresService, 
  ) {
    super(drdTopicItemRepository);
  }

  /**
   * Cria múltiplos Itens de Tópico, e seus Scores Mínimos, para um Tópico pai específico.
   * @param topicId ID do Tópico pai.
   * @param itemDtos Array de DTOs dos itens a serem criados (contém scoresByLevel).
   * @param manager EntityManager da transação principal.
   * @returns Um array das entidades DRDTopicItem criadas.
   */
  async createManyInTransaction(
    topicId: number,
    itemDtos: CreateDRDTopicItemDto[],
    levelMap: LevelMap,
    manager: EntityManager,
  ): Promise<DRDTopicItem[]> {
    const savedItems: DRDTopicItem[] = [];

    try {
      for (const itemDto of itemDtos) {
        const newItem = manager.create(DRDTopicItem, {
          drd_topic_id: topicId,
          name: itemDto.name,
          order: itemDto.order,
          uuid: uuidv4()
        });

        const savedItem = await manager.save(DRDTopicItem, newItem);
        savedItems.push(savedItem);

        await this.drdLevelMinScoresService.createManyForTopicItemInTransaction(
          savedItem.id,
          levelMap,
          itemDto.scoresByLevel,
          manager,
        );
      }

      return savedItems;
      
    } catch (error) {
      console.error('Erro ao salvar DRD Topic Items e Scores na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Itens de Tópico e suas pontuações.');
    }
  }
}
