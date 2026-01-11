import { Injectable } from '@nestjs/common';
import { DrdsService } from '@/modules/drds/drds.service';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { User } from '@/entities/user.entity';
import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';

/**
 * Estrutura baseada no seu exemplo de base do DTO
 */
interface DRDSeedDefinition {
  jobPositionTitle: string;
  rate: number;
  levels: { name: string; order: number }[];
  metrics: {
    name: string;
    order: number;
    type: MetricType;
    prefix: MetricPrefix;
    scoresByLevel: { drd_level_order: number; min_score: number }[];
  }[];
  topics: {
    name: string;
    order: number;
    drdTopicItems: {
      name: string;
      order: number;
      scoresByLevel: { drd_level_order: number; min_score: number }[];
    }[];
  }[];
}

@Injectable()
export class DRDsSeed {
  constructor(
    private readonly drdsService: DrdsService,
    private readonly jobPositionService: JobPositionService,
  ) {}

  private readonly drdDefinitions: DRDSeedDefinition[] = [
    {
      jobPositionTitle: 'Tech Recruiter',
      rate: 5,
      levels: [
        { name: 'Junior', order: 1 },
        { name: 'Pleno', order: 2 },
        { name: 'Sênior', order: 3 },
      ],
      metrics: [
        {
          name: 'Tempo de Fechamento (SLA)',
          order: 1,
          type: MetricType.DURATION_DAYS,
          prefix: MetricPrefix.MENOR_OU_IGUAL,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 30 },
            { drd_level_order: 2, min_score: 20 },
            { drd_level_order: 3, min_score: 15 },
          ],
        },
      ],
      topics: [
        {
          name: 'Competências Técnicas',
          order: 1,
          drdTopicItems: [
            {
              name: 'Sourcing (Busca Ativa)',
              order: 1,
              scoresByLevel: [
                { drd_level_order: 1, min_score: 3 },
                { drd_level_order: 2, min_score: 4 },
                { drd_level_order: 3, min_score: 5 },
              ],
            },
            {
              name: 'Entrevista Técnica',
              order: 2,
              scoresByLevel: [
                { drd_level_order: 1, min_score: 2 },
                { drd_level_order: 2, min_score: 4 },
                { drd_level_order: 3, min_score: 5 },
              ],
            },
          ],
        },
      ],
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
