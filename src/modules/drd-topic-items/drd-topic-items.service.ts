import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDTopicItem } from '@/entities/drd-topic-item.entity';
import { DRDTopicItemDto } from './dtos/drd-topic-item.dto';

@Injectable()
export class DrdTopicItemsService extends BaseService<DRDTopicItem> {
  constructor(
    @InjectRepository(DRDTopicItem)
    private drdTopicItemRepository: Repository<DRDTopicItem>,
  ) {
    super(drdTopicItemRepository);
  }

  /**
   * Cria múltiplos Itens de Tópico para um Tópico pai específico usando uma transação.
   * @param topicId ID do Tópico pai.
   * @param itemDtos Array de DTOs dos itens a serem criados.
   * @param manager QueryRunner da transação principal.
   * @returns Um array das entidades DRDTopicItem criadas.
   */
  async createManyInTransaction(
    topicId: number,
    itemDtos: DRDTopicItemDto[],
    manager?: EntityManager,
  ): Promise<DRDTopicItem[]> {
    try {
      const itemsToSave = itemDtos.map(dto => ({
        ...dto,
        drd_topic_id: topicId,
      }));

      return await manager.save(DRDTopicItem, itemsToSave);
      
    } catch (error) {
      console.error('Erro ao salvar DRD Topic Items na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Itens de Tópico de DRD.');
    }
  }
}
