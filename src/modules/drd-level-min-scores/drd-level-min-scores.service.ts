import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDLevelMinScore } from '@/entities/drd-level-min-score.entity';
import { CreateDRDLevelMinScoreDto } from './dtos/create-drd-level-min-score.dto';
import { LevelMap } from '@/common/types/level-map.type';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class DrdLevelMinScoresService extends BaseService<DRDLevelMinScore> {
  constructor(
    @InjectRepository(DRDLevelMinScore)
    private drdLevelMinScoreRepository: Repository<DRDLevelMinScore>,
  ) {
    super(drdLevelMinScoreRepository);
  }

  private async saveScores(
    parentId: number,
    parentKey: 'drd_metric_id' | 'drd_topic_item_id',
    levelMap: LevelMap,
    scoreDtos: CreateDRDLevelMinScoreDto[],
    manager: EntityManager,
  ): Promise<DRDLevelMinScore[]> {
    try {
      const scoresToSave = scoreDtos.map(dto => {
        const drd_level_id = levelMap.get(dto.drd_level_order);

        if (!drd_level_id) {
          throw new InternalServerErrorException(
            `Nível com ordem ${dto.drd_level_order} não encontrado no mapa de Levels.`,
          );
        }

        const scoreData: Partial<DRDLevelMinScore> = {
          uuid: uuidv4(),
          [parentKey]: parentId,
          drd_level_id: drd_level_id,
          min_score: dto.min_score,
        };

        if (parentKey === 'drd_metric_id') {
          scoreData.drd_topic_item_id = null;
        } else {
          scoreData.drd_metric_id = null;
        }

        return scoreData;
      });

      return await manager.save(DRDLevelMinScore, scoresToSave);
      
    } catch (error) {
      console.error('Erro ao salvar DRD Level Min Scores na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Pontuações Mínimas de DRD.');
    }
  }

  async createManyForMetricInTransaction(
    metricId: number,
    levelMap: LevelMap,
    scoreDtos: CreateDRDLevelMinScoreDto[],
    manager: EntityManager,
  ): Promise<DRDLevelMinScore[]> {
    return this.saveScores(metricId, 'drd_metric_id', levelMap, scoreDtos, manager);
  }

  async createManyForTopicItemInTransaction(
    topicItemId: number,
    levelMap: LevelMap,
    scoreDtos: CreateDRDLevelMinScoreDto[],
    manager: EntityManager,
  ): Promise<DRDLevelMinScore[]> {
    return this.saveScores(topicItemId, 'drd_topic_item_id', levelMap, scoreDtos, manager);
  }
}
