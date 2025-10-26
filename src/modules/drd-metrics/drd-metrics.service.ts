import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDMetric } from '@/entities/drd-metric.entity';
import { DrdLevelMinScoresService } from '../drd-level-min-scores/drd-level-min-scores.service';
import { LevelMap } from '@/common/types/level-map.type';
import { CreateDRDMetricDto } from './dtos/create-drd-metric.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDRDMetricDto } from './dtos/update-drd-metric.dto';
import { DRDLevelMinScore } from '@/entities/drd-level-min-score.entity';

@Injectable()
export class DrdMetricsService extends BaseService<DRDMetric> {
  constructor(
    @InjectRepository(DRDMetric)
    private drdMetricRepository: Repository<DRDMetric>,
    private drdLevelMinScoresService: DrdLevelMinScoresService, 
  ) {
    super(drdMetricRepository);
  }

  /**
   * Cria múltiplas Métricas e seus Scores Mínimos em uma transação ativa.
   * @param drdId ID do DRD pai.
   * @param metricsDtos Array de DTOs das métricas.
   * @param levelMap Mapa para conversão de Level Order para Level ID.
   * @param manager EntityManager da transação principal.
   */
  async createMetricsAndMinScoresInTransaction(
    drdId: number,
    metricsDtos: CreateDRDMetricDto[],
    levelMap: LevelMap,
    manager: EntityManager
  ): Promise<void> {
    try {
      for (const metricDto of metricsDtos) {
        const newMetric = manager.create(DRDMetric, {
          ...metricDto, 
          drd_id: drdId,
          uuid: uuidv4()
        });
        const savedMetric = await manager.save(DRDMetric, newMetric);

        await this.drdLevelMinScoresService.createManyForMetricInTransaction(
          savedMetric.id,
          levelMap,
          metricDto.scoresByLevel,
          manager
        );
      }
      
    } catch (error) {
      console.error('Erro ao salvar DRD Metrics e Scores na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Métricas de DRD.');
    }
  }

  async syncMetricsAndMinScoresInTransaction(
    drdId: number,
    incomingMetrics: UpdateDRDMetricDto[],
    existingMetrics: DRDMetric[],
    levelMap: Map<number, { id: number, uuid: string }>,
    manager: EntityManager,
  ): Promise<DRDMetric[]> {

    const existingMetricUuids = existingMetrics.map(m => m.uuid);
    const incomingMetricUuids = incomingMetrics.map(m => m.uuid).filter(uuid => !!uuid);

    const metricsToDeleteUuids = existingMetricUuids.filter(uuid => !incomingMetricUuids.includes(uuid));

    if (metricsToDeleteUuids.length > 0) {
      await manager.delete(DRDMetric, { drd_id: drdId, uuid: In(metricsToDeleteUuids) });
    }

    const savedMetrics: DRDMetric[] = [];
    for (const incomingMetric of incomingMetrics) {      
      const metricUuid = incomingMetric.uuid || uuidv4();

      const metricToSave = manager.create(DRDMetric, {
        id: existingMetrics.find(m => m.uuid === metricUuid)?.id,
        uuid: metricUuid,
        drd_id: drdId,
        name: incomingMetric.name,
        type: incomingMetric.type,
        prefix: incomingMetric.prefix,
        classification: incomingMetric.classification,
        order: incomingMetric.order,
      });
      const savedMetric = await manager.save(DRDMetric, metricToSave);

      const existingMetric = existingMetrics.find(m => m.uuid === metricUuid);
      const existingScores = existingMetric ? existingMetric.minScores : [];

      const existingScoreUuids = existingScores.map(score => score.uuid);
      const incomingScoreUuids = incomingMetric.scoresByLevel.map(score => score.uuid).filter(uuid => !!uuid);

      const scoresToDeleteUuids = existingScoreUuids.filter(uuid => !incomingScoreUuids.includes(uuid));

      if (scoresToDeleteUuids.length > 0) {
        await manager.delete(DRDLevelMinScore, { uuid: In(scoresToDeleteUuids) });
      }

      const scoresToUpsert = incomingMetric.scoresByLevel.map(scoreDto => {
        const level = levelMap.get(scoreDto.drd_level_order);
        if (!level) {
          throw new InternalServerErrorException(`Nível de ordem ${scoreDto.drd_level_order} não mapeado para scores de métrica ao tentar atualizar DRD.`);
        }

        const existingScore = existingScores.find(s => s.uuid === scoreDto.uuid);

        return manager.create(DRDLevelMinScore, {
          id: existingScore?.id,
          uuid: scoreDto.uuid || uuidv4(),
          drd_metric_id: savedMetric.id,
          drd_topic_item_id: null,
          drd_level_id: level.id,
          min_score: scoreDto.min_score,
        });
      });

      const savedMinScores = await manager.save(DRDLevelMinScore, scoresToUpsert);

      savedMetric.minScores = savedMinScores;
      savedMetrics.push(savedMetric);
    }

    return savedMetrics;
  }
}
