import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDMetrics } from '@/entities/drd-metric.entity';
import { DrdLevelMinScoresService } from '../drd-level-min-scores/drd-level-min-scores.service';
import { DRDMetricDto } from './dtos/drd-metric.dto';

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
   * @param manager EntityManager da transação principal.
   */
  async createMetricsAndMinScoresInTransaction(
    drdId: number,
    metricsDtos: DRDMetricDto[],
    manager: EntityManager
  ): Promise<void> {
    try {
      for (const metricDto of metricsDtos) {
        const newMetric = manager.create(DRDMetrics, {
          ...metricDto,
          drd_id: drdId,
        });
        const savedMetric = await manager.save(DRDMetrics, newMetric);

        await this.drdLevelMinScoresService.createManyInTransaction(
          savedMetric.id,
          metricDto.min_scores,
          manager
        );
      }
      
    } catch (error) {
      console.error('Erro ao salvar DRD Metrics e Scores na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Métricas de DRD.');
    }
  }
}
