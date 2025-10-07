import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDLevel } from '@/entities/drd-level.entity';
import { DRDLevelDto } from './dtos/drd-level.dto';

@Injectable()
export class DrdLevelsService extends BaseService<DRDLevel> {
  constructor(
    @InjectRepository(DRDLevel)
    private drdLevelRepository: Repository<DRDLevel>,
  ) {
    super(drdLevelRepository);
  }

  /**
   * Cria múltiplos níveis para um DRD usando uma transação ativa.
   * @param drdId ID do DRD pai.
   * @param levelDtos Array de DTOs dos níveis a serem criados.
   * @param manager EntityManager da transação principal.
   * @returns Um array das entidades DRDLevel criadas.
   */
  async createManyInTransaction(
    drdId: number,
    levelDtos: DRDLevelDto[],
    manager?: EntityManager,
  ): Promise<DRDLevel[]> {
    try {
      const levelsToSave = levelDtos.map(dto => ({
        ...dto,
        drd_id: drdId,
      }));

      return await manager.save(DRDLevel, levelsToSave);
      
    } catch (error) {
      console.error('Erro ao salvar DRD Levels na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Níveis de DRD.');
    }
  }
}
