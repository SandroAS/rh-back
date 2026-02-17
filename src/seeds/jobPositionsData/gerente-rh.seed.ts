import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Gerente de RH',
  cbo_code: '1232-10',
  base_salary: 0,
  description: 'Responsável pela estratégia de pessoas da organização: definição de políticas de RH, gestão da área, alinhamento com a diretoria e desenvolvimento da cultura e do employer branding.',
  metrics: [
    {
      name: 'Índice de Turnover Global (Anualizado)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Retenção Estratégica',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 22 }, { drd_level_order: 2, min_score: 20 }, { drd_level_order: 3, min_score: 18 },
        { drd_level_order: 4, min_score: 15 }, { drd_level_order: 5, min_score: 12 }, { drd_level_order: 6, min_score: 10 },
        { drd_level_order: 7, min_score: 8 }, { drd_level_order: 8, min_score: 6 }, { drd_level_order: 9, min_score: 5 },
      ],
    },
    {
      name: 'eNPS (Employee Net Promoter Score)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Clima e Cultura',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 40 }, { drd_level_order: 2, min_score: 50 }, { drd_level_order: 3, min_score: 60 },
        { drd_level_order: 4, min_score: 70 }, { drd_level_order: 5, min_score: 75 }, { drd_level_order: 6, min_score: 80 },
        { drd_level_order: 7, min_score: 85 }, { drd_level_order: 8, min_score: 88 }, { drd_level_order: 9, min_score: 90 },
      ],
    },
  ],
  topics: [
    {
      name: 'Estratégia e Liderança de RH',
      order: 1,
      drdTopicItems: [
        {
          name: 'Estratégia de Pessoas e Alinhamento ao Negócio',
          description: 'Tradução da estratégia da empresa em planos de RH (headcount, C&B, T&D) e governança com a diretoria.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Gestão e Desenvolvimento da Área de RH',
          description: 'Liderança de coordenadores e analistas, definição de processos escaláveis e métricas de eficácia do RH.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
