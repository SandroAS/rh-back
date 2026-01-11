import { Injectable } from '@nestjs/common';
import { DrdsService } from '@/modules/drds/drds.service';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { User } from '@/entities/user.entity';
import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { CreateDRDLevelDto } from '@/modules/drd-levels/dtos/create-drd-level.dto';
import { CreateDRDMetricDto } from '@/modules/drd-metrics/dtos/create-drd-metric.dto';
import { CreateDRDTopicDto } from '@/modules/drd-topics/dtos/create-drd-topic.dto';
import techRecuiterSeed from './jobPositionsData/tech-recuiter.seed';

interface DRDSeedDefinition {
  jobPositionTitle: string;
  rate: number;
  levels: CreateDRDLevelDto[];
  metrics: CreateDRDMetricDto[];
  topics: CreateDRDTopicDto[];
}

@Injectable()
export class DRDsSeed {
  constructor(
    private readonly drdsService: DrdsService,
    private readonly jobPositionService: JobPositionService,
  ) {}

  private readonly rate: number = 5;
  private readonly levels: CreateDRDLevelDto[] = [
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

  private readonly drdDefinitions: DRDSeedDefinition[] = [
    {
      jobPositionTitle: techRecuiterSeed.title,
      rate: this.rate,
      levels: this.levels,
      metrics: techRecuiterSeed.metrics,
      topics: techRecuiterSeed.topics,
    },
  ];

  async seed(accountId: number, user: User) {
    console.log(`[SEED] Iniciando criação de DRDs para a conta ${accountId}...`);

    try {
      const jobPositions = await this.jobPositionService.findAllWithAccountId(accountId);

      for (const config of this.drdDefinitions) {
        const jobPosition = jobPositions.find(jp => jp.title === config.jobPositionTitle);

        if (!jobPosition) {
          console.warn(`[SEED] Cargo "${config.jobPositionTitle}" não encontrado na conta ${accountId}.`);
          continue;
        }

        const createDto = {
          job_position_uuid: jobPosition.uuid,
          rate: config.rate,
          levels: config.levels,
          metrics: config.metrics,
          topics: config.topics,
        };

        await this.drdsService.createByAccountId(createDto, accountId, user);
        console.log(`[SEED] DRD para "${config.jobPositionTitle}" criado.`);
      }
    } catch (error) {
      console.error(`[SEED] Erro crítico no processo de seed:`, error.message);
    }
  }
}
