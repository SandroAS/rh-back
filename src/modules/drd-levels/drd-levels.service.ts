import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';
import { DRDLevel } from '@/entities/drd-level.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDRDLevelDto } from './dtos/update-drd-level.dto';
import { CreateDRDLevelDto } from './dtos/create-drd-level.dto';

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
    levelDtos: CreateDRDLevelDto[],
    manager?: EntityManager,
  ): Promise<DRDLevel[]> {
    try {
      const levelsToSave = levelDtos.map(dto => ({
        ...dto,
        drd_id: drdId,
        uuid: uuidv4()
      }));

      return await manager.save(DRDLevel, levelsToSave);
      
    } catch (error) {
      console.error('Erro ao salvar DRD Levels na transação:', error);
      throw new InternalServerErrorException('Falha ao salvar Níveis de DRD.');
    }
  }

  async syncLevelsInTransaction(
    drdId: number, 
    newLevels: UpdateDRDLevelDto[], 
    existingLevels: DRDLevel[], 
    manager: EntityManager
  ): Promise<DRDLevel[]> {

    const existingUuids = existingLevels.map(lvl => lvl.uuid);
    const incomingUuids = newLevels.map(lvl => lvl.uuid).filter(uuid => !!uuid);
    const uuidsToDelete = existingUuids.filter(uuid => !incomingUuids.includes(uuid));

    if (uuidsToDelete.length > 0) {
      await manager.delete(DRDLevel, { drd_id: drdId, uuid: In(uuidsToDelete) });
    }

    const levelsToUpsert = newLevels.map(lvl => {
      const existingLevel = existingLevels.find(eLvl => eLvl.uuid === lvl.uuid);
      return {
        id: existingLevel?.id,
        ...lvl,
        drd_id: drdId,
        uuid: lvl.uuid || uuidv4(), 
      };
    });

    const savedLevels = await manager.save(DRDLevel, levelsToUpsert);

    return savedLevels;
  }
}
