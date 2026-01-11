import { Injectable } from '@nestjs/common';
import { DrdsService } from '@/modules/drds/drds.service';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { User } from '@/entities/user.entity';
import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { CreateDRDLevelDto } from '@/modules/drd-levels/dtos/create-drd-level.dto';
import { CreateDRDMetricDto } from '@/modules/drd-metrics/dtos/create-drd-metric.dto';
import { CreateDRDTopicDto } from '@/modules/drd-topics/dtos/create-drd-topic.dto';

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
      jobPositionTitle: 'Tech Recruiter',
      rate: this.rate,
      levels: this.levels,
      metrics: [
        {
          name: 'Tempo de Fechamento (SLA)',
          order: 1,
          type: MetricType.DURATION_DAYS,
          prefix: MetricPrefix.MENOR_OU_IGUAL,
          classification: 'Tempo de Fechamento (SLA)',
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
