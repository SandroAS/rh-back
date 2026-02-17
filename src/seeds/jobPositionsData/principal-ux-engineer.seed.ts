import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Principal UX Engineer',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Máximo nível individual contributor em UX Engineering: define a direção de implementação de experiência na empresa, design systems em escala e é referência para design, front-end e produto.',
  metrics: [
    {
      name: 'Impacto de Experiência no Negócio',
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
      name: 'Visão de UX Engineering da Organização',
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
      name: 'Estratégia de UX Engineering',
      order: 1,
      drdTopicItems: [
        {
          name: 'Visão de Design System e Padrões',
          description: 'Definição de rumo de design system, acessibilidade e padrões de UI em nível empresa.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Trade-offs Experiência x Performance x Escopo',
          description: 'Decisões que equilibram qualidade de UX, performance e capacidade de entrega.',
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
          name: 'Mentoria de Staff e UX Leads',
          description: 'Elevação do nível de implementação de experiência dos principais líderes de UX/ front-end.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Evangelização de Boas Práticas de UX',
          description: 'Promoção de acessibilidade, usabilidade e design centrado no usuário na engenharia.',
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
          name: 'Experiência em Produtos Críticos',
          description: 'Soluções de UX para fluxos de alto impacto (onboarding, conversão, suporte).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Inovação em UI e Interação',
          description: 'Exploração de novas abordagens (design tokens, micro-interactions, multi-plataforma).',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 2 : 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
