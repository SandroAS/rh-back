import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDLevelMinScore } from '@/entities/drd-level-min-score.entity';
import { DRDLevelMinScoreDto } from './dtos/drd-level-min-score.dto';

@Injectable()
export class DrdLevelMinScoresService extends BaseService<DRDLevelMinScore> {
  constructor(
    @InjectRepository(DRDLevelMinScore)
    private drdLevelMinScoreRepository: Repository<DRDLevelMinScore>,
  ) {
    super(drdLevelMinScoreRepository);
  }

  /**
   * Cria múltiplos Scores Mínimos para uma Métrica específica usando uma transação ativa.
   * @param metricId ID da Métrica pai.
   * @param scoreDtos Array de DTOs dos scores a serem criados.
   * @param manager EntityManager da transação principal.
   * @returns Um array das entidades DRDLevelMinScore criadas.
   */
  async createManyInTransaction(
    metricId: number,
    scoreDtos: DRDLevelMinScoreDto[],
    manager: EntityManager,
  ): Promise<DRDLevelMinScore[]> {
    try {
      const scoresToSave = scoreDtos.map(dto => ({
        drd_metric_id: metricId, 
        drd_level_id: dto.drd_level_id, 
        min_score: dto.min_score,
      }));

      return await manager.save(DRDLevelMinScore, scoresToSave);
      
    } catch (error) {
      console.error('Erro ao salvar DRD Level Min Scores na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Pontuações Mínimas de DRD.');
    }
  }
}
