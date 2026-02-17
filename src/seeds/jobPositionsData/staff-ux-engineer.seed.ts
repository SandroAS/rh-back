import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Staff UX Engineer',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'UX Engineer sênior com impacto além do squad: une design e código, define padrões de implementação de UI/UX, design systems e influencia múltiplos times na qualidade da experiência.',
  metrics: [
    {
      name: 'Impacto de UX no Produto (Conversão/NPS)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Negócio',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 8.0 },
        { drd_level_order: 2, min_score: 12.0 },
        { drd_level_order: 3, min_score: 16.0 },
        { drd_level_order: 4, min_score: 20.0 },
        { drd_level_order: 5, min_score: 25.0 },
        { drd_level_order: 6, min_score: 30.0 },
        { drd_level_order: 7, min_score: 35.0 },
        { drd_level_order: 8, min_score: 40.0 },
        { drd_level_order: 9, min_score: 45.0 },
      ],
    },
    {
      name: 'Alcance em Múltiplos Times/Produtos',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Alcance',
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
      name: 'Design System e Componentes',
      order: 1,
      drdTopicItems: [
        {
          name: 'Arquitetura de Design System',
          description: 'Desenho e evolução de sistemas de design usados por vários times.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Acessibilidade e Padrões (a11y)',
          description: 'Garantia de que os componentes e fluxos atendam a padrões de acessibilidade.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Ponte Design e Engenharia',
      order: 2,
      drdTopicItems: [
        {
          name: 'Implementação Fiel ao Design',
          description: 'Tradução de protótipos e especificações em código de alta qualidade (React, etc.).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Performance e UX (Core Web Vitals)',
          description: 'Otimização de carregamento, animações e interação para melhor experiência.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
      ],
    },
    {
      name: 'Liderança Técnica em UX',
      order: 3,
      drdTopicItems: [
        {
          name: 'Mentoria de UX Engineers e Devs Front-end',
          description: 'Desenvolvimento de outros em padrões de UI, acessibilidade e design system.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Colaboração com Design e Produto',
          description: 'Participação em discovery e definição de requisitos de experiência desde o início.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
