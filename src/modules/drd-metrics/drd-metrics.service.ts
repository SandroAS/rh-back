import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDMetrics } from '@/entities/drd-metric.entity';
import { DrdLevelMinScoresService } from '../drd-level-min-scores/drd-level-min-scores.service';
import { LevelMap } from '@/common/types/level-map.type';
import { CreateDRDMetricDto } from './dtos/create-drd-metric.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DrdMetricsService extends BaseService<DRDMetrics> {
  constructor(
    @InjectRepository(DRDMetrics)
    private drdMetricRepository: Repository<DRDMetrics>,
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
        const newMetric = manager.create(DRDMetrics, {
          ...metricDto, 
          drd_id: drdId,
          uuid: uuidv4()
        });
        const savedMetric = await manager.save(DRDMetrics, newMetric);

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
}
