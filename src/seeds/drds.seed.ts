import { Injectable, Logger } from '@nestjs/common';
import { DrdsService } from '@/modules/drds/drds.service';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { User } from '@/entities/user.entity';
import { CreateDRDLevelDto } from '@/modules/drd-levels/dtos/create-drd-level.dto';
import { jobPositionDefinitions } from './jobPositionsData/job-positions-data-definition';

@Injectable()
export class DRDsSeed {
  private readonly logger = new Logger(DRDsSeed.name);

  constructor(
    private readonly drdsService: DrdsService,
    private readonly jobPositionService: JobPositionService,
  ) {}

  private readonly defaultLevels: CreateDRDLevelDto[] = [
    { name: 'Junior I', order: 1 },
    { name: 'Junior II', order: 2 },
    { name: 'Junior III', order: 3 },
    { name: 'Pleno I', order: 4 },
    { name: 'Pleno II', order: 5 },
    { name: 'Pleno III', order: 6 },
    { name: 'Sênior I', order: 7 },
    { name: 'Sênior II', order: 8 },
    { name: 'Sênior III', order: 9 },
  ];

  async seed(accountId: number, user: User) {
    this.logger.log(`Iniciando criação de DRDs para a conta ${accountId}...`);

    try {
      const jobPositions = await this.jobPositionService.findAllWithAccountId(accountId);

      for (const definition of jobPositionDefinitions) {
        // Ignora definições de cargos que não possuem métricas ou tópicos configurados para DRD
        if (!definition.metrics?.length && !definition.topics?.length) {
          continue;
        }

        const jobPosition = jobPositions.find(jp => jp.title === definition.title);

        if (!jobPosition) {
          this.logger.warn(`Cargo "${definition.title}" não encontrado. Pulando DRD.`);
          continue;
        }

        const createDto = {
          job_position_uuid: jobPosition.uuid,
          rate: 5,
          levels: this.defaultLevels,
          metrics: definition.metrics || [],
          topics: definition.topics || [],
        };

        try {
          await this.drdsService.createByAccountId(createDto, accountId, user);
          this.logger.log(`DRD para "${definition.title}" criado com sucesso.`);
        } catch (err) {
          if (err.message.includes('already exists')) {
            this.logger.debug(`DRD para "${definition.title}" já existe.`);
          } else {
            this.logger.error(`Erro ao criar DRD para "${definition.title}": ${err.message}`);
          }
        }
      }
    } catch (error) {
      this.logger.error(`Erro crítico no processo de seed de DRDs: ${error.message}`);
    }
  }
}
