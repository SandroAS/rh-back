import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'CPO',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Chief Product Officer: responsável pela visão de produto da empresa, alinhamento produto-negócio e liderança executiva da área de produto. Reporta ao CEO e integra a C-level.',
  metrics: [
    {
      name: 'Impacto de Produto no Negócio (Receita/Crescimento)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Estratégia',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 50.0 },
        { drd_level_order: 2, min_score: 60.0 },
        { drd_level_order: 3, min_score: 70.0 },
        { drd_level_order: 4, min_score: 78.0 },
        { drd_level_order: 5, min_score: 85.0 },
        { drd_level_order: 6, min_score: 90.0 },
        { drd_level_order: 7, min_score: 93.0 },
        { drd_level_order: 8, min_score: 96.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
    {
      name: 'Visão e Posicionamento de Produto',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Liderança',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 1 },
        { drd_level_order: 2, min_score: 2 },
        { drd_level_order: 3, min_score: 3 },
        { drd_level_order: 4, min_score: 4 },
        { drd_level_order: 5, min_score: 5 },
        { drd_level_order: 6, min_score: 6 },
        { drd_level_order: 7, min_score: 7 },
        { drd_level_order: 8, min_score: 8 },
        { drd_level_order: 9, min_score: 10 },
      ],
    },
  ],
  topics: [
    {
      name: 'Estratégia de Produto da Empresa',
      order: 1,
      drdTopicItems: [
        {
          name: 'Visão de Produto e Mercado',
          description: 'Definição de rumo de produto, posicionamento competitivo e inovação.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Investimento e Portfólio',
          description: 'Decisões de onde investir em produto (novos produtos, geografias, segmentos).',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Liderança Executiva',
      order: 2,
      drdTopicItems: [
        {
          name: 'Liderança de Head of Product e Área',
          description: 'Desenvolvimento de líderes de produto e cultura de produto na empresa.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Board e Investidores',
          description: 'Comunicação de estratégia de produto, roadmap e resultados para board e investidores.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Parceria C-Level',
      order: 3,
      drdTopicItems: [
        {
          name: 'Alinhamento com CEO e Outros C-Levels',
          description: 'Parceria com CEO, CTO, CMO e CFO para execução da estratégia.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Cultura e Experiência do Cliente',
          description: 'Garantir que a organização priorize o usuário e a experiência do produto.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
