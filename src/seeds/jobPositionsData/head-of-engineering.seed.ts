import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Head of Engineering',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Liderança de toda a área de engenharia: múltiplos times, estratégia técnica, orçamento e pessoas. Reporta à C-level e define como a engenharia entrega valor para o negócio.',
  metrics: [
    {
      name: 'Entrega e Predictability da Área',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Resultados',
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
    {
      name: 'Retenção e Saúde dos Times',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Pessoas',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 75.0 },
        { drd_level_order: 2, min_score: 80.0 },
        { drd_level_order: 3, min_score: 85.0 },
        { drd_level_order: 4, min_score: 88.0 },
        { drd_level_order: 5, min_score: 90.0 },
        { drd_level_order: 6, min_score: 92.0 },
        { drd_level_order: 7, min_score: 94.0 },
        { drd_level_order: 8, min_score: 96.0 },
        { drd_level_order: 9, min_score: 98.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Estratégia e Visão de Engenharia',
      order: 1,
      drdTopicItems: [
        {
          name: 'Roadmap e Priorização da Área',
          description: 'Alinhamento da capacidade de engenharia com as metas de negócio e produto.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Arquitetura e Padrões Organizacionais',
          description: 'Direção técnica em nível de empresa (stack, infraestrutura, qualidade).',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Gestão de Líderes',
      order: 2,
      drdTopicItems: [
        {
          name: 'Desenvolvimento de EMs e Tech Leads',
          description: 'Mentoria de gestores e líderes técnicos para escalar a organização.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Estrutura de Times e Hiring',
          description: 'Definição de squads, headcount e processos de recrutamento em escala.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Orçamento e Stakeholders',
      order: 3,
      drdTopicItems: [
        {
          name: 'Orçamento e Custos de Engenharia',
          description: 'Gestão de custos (pessoas, ferramentas, cloud) e justificativa de investimentos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 5 })),
        },
        {
          name: 'Comunicação com C-Level e Produto',
          description: 'Tradução de resultados técnicos em impacto de negócio e expectativas realistas.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
