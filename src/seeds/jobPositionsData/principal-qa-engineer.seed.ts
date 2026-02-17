import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Principal QA Engineer',
  cbo_code: '2124-20',
  base_salary: 0,
  description:
    'Máximo nível individual contributor em QA: define a estratégia de qualidade da empresa, influencia cultura e processos em toda a organização e é referência em garantia de qualidade.',
  metrics: [
    {
      name: 'Impacto em Qualidade e Redução de Incidentes',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Impacto Estratégico',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 10.0 },
        { drd_level_order: 2, min_score: 15.0 },
        { drd_level_order: 3, min_score: 20.0 },
        { drd_level_order: 4, min_score: 25.0 },
        { drd_level_order: 5, min_score: 30.0 },
        { drd_level_order: 6, min_score: 35.0 },
        { drd_level_order: 7, min_score: 40.0 },
        { drd_level_order: 8, min_score: 45.0 },
        { drd_level_order: 9, min_score: 50.0 },
      ],
    },
    {
      name: 'Visão de Qualidade da Organização',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Liderança de Pensamento',
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
      name: 'Estratégia de Qualidade da Empresa',
      order: 1,
      drdTopicItems: [
        {
          name: 'Visão de Qualidade de Longo Prazo',
          description: 'Definição de metas de qualidade, confiabilidade e experiência do usuário em nível empresa.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Trade-offs Qualidade vs Velocidade',
          description: 'Decisões que equilibram entrega rápida e estabilidade em nível organizacional.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Influência e Desenvolvimento',
      order: 2,
      drdTopicItems: [
        {
          name: 'Mentoria de Staff e QA Leads',
          description: 'Elevação do nível de qualidade e automação dos principais líderes de QA.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Cultura de Qualidade e DevQuality',
          description: 'Promoção da responsabilidade compartilhada por qualidade entre engenharia e produto.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Problemas de Maior Complexidade',
      order: 3,
      drdTopicItems: [
        {
          name: 'Qualidade em Sistemas Críticos',
          description: 'Estratégias para sistemas de alta criticidade (financeiro, saúde, infraestrutura).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Inovação em Testes e Ferramentas',
          description: 'Exploração de novas abordagens (chaos engineering, contract testing, etc.).',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 2 : 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
