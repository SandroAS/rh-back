import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Group Product Manager',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Lidera um grupo de Product Managers e/ou um portfólio de produtos: define estratégia de produto em nível de área, alinha múltiplos squads e desenvolve outros PMs.',
  metrics: [
    {
      name: 'Resultado de Negócio da Área (Receita/Retenção)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Impacto',
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
      name: 'Alinhamento e Entrega dos PMs do Grupo',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Liderança',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 65.0 },
        { drd_level_order: 2, min_score: 72.0 },
        { drd_level_order: 3, min_score: 80.0 },
        { drd_level_order: 4, min_score: 85.0 },
        { drd_level_order: 5, min_score: 90.0 },
        { drd_level_order: 6, min_score: 93.0 },
        { drd_level_order: 7, min_score: 95.0 },
        { drd_level_order: 8, min_score: 97.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Estratégia de Produto em Escala',
      order: 1,
      drdTopicItems: [
        {
          name: 'Visão e Roadmap da Área',
          description: 'Definição de prioridades e direção para um conjunto de produtos ou squads.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Trade-offs entre Produtos',
          description: 'Decisões de alocação de capacidade e priorização entre múltiplos backlogs.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Liderança de PMs',
      order: 2,
      drdTopicItems: [
        {
          name: 'Mentoria e Desenvolvimento de PMs',
          description: 'Apoio no crescimento de product managers em discovery, priorização e stakeholders.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Padrões e Processos de Produto',
          description: 'Definição de práticas de produto adotadas pelo grupo (rituais, métricas, documentação).',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Stakeholders e Negócio',
      order: 3,
      drdTopicItems: [
        {
          name: 'Comunicação com Liderança e Negócio',
          description: 'Alinhamento com C-level, vendas e operação sobre roadmap e resultados da área.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Métricas de Produto e OKRs',
          description: 'Definição e acompanhamento de metas de produto alinhadas ao negócio.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
