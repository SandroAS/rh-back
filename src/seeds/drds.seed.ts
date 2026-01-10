import { Injectable } from '@nestjs/common';
import { User } from '@/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosition } from '@/entities/job-position.entity';
import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { DrdsService } from '@/modules/drds/drds.service';

/**
 * Estrutura baseada no CreateDRDDto fornecido
 */
interface DRDSeedDefinition {
  jobPositionName: string;
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
    @InjectRepository(JobPosition)
    private readonly jobPositionRepository: Repository<JobPosition>,
  ) {}

  /**
   * Lista de definições escalável
   */
  private readonly drdDefinitions: DRDSeedDefinition[] = [
    {
      jobPositionName: 'Tech Recruiter',
      rate: 1000,
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
    // Exemplo de como adicionar outro cargo rapidamente:
    /*
    {
      jobPositionName: 'Desenvolvedor Frontend',
      rate: 1500,
      levels: [{ name: 'Júnior', order: 1 }],
      metrics: [...],
      topics: [...]
    }
    */
  ];

  async seed(accountId: number, user: User) {
    console.log(`[SEED] Iniciando criação de DRDs para a conta ${accountId}...`);

    for (const config of this.drdDefinitions) {
      try {
        const jobPosition = await this.jobPositionRepository.findOne({
          where: { 
            title: config.jobPositionName, 
            account: { id: accountId } 
          }
        });

        if (!jobPosition) {
          console.warn(`[SEED] Cargo "${config.jobPositionName}" não encontrado na conta ${accountId}.`);
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
        
        console.log(`[SEED] DRD para "${config.jobPositionName}" processado com sucesso.`);

      } catch (error) {
        console.error(`[SEED] Erro ao processar DRD para "${config.jobPositionName}":`, error.message);
      }
    }
  }
}
