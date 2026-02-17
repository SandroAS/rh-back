import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'CTO',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Chief Technology Officer: responsável pela visão tecnológica da empresa, inovação, escala e alinhamento da tecnologia com a estratégia de negócio. Lidera a área de engenharia em nível executivo.',
  metrics: [
    {
      name: 'Alinhamento Tecnologia x Negócio',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Estratégia',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 60.0 },
        { drd_level_order: 2, min_score: 70.0 },
        { drd_level_order: 3, min_score: 78.0 },
        { drd_level_order: 4, min_score: 85.0 },
        { drd_level_order: 5, min_score: 90.0 },
        { drd_level_order: 6, min_score: 93.0 },
        { drd_level_order: 7, min_score: 95.0 },
        { drd_level_order: 8, min_score: 97.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
    {
      name: 'Inovação e Escalabilidade Técnica',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Impacto',
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
      name: 'Visão e Estratégia Tecnológica',
      order: 1,
      drdTopicItems: [
        {
          name: 'Visão de Tecnologia de Longo Prazo',
          description: 'Definição de rumo tecnológico da empresa (build vs buy, stack, parcerias).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Inovação e P&D',
          description: 'Investimento em novas tecnologias, experimentação e preparação para o futuro.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 5 })),
        },
      ],
    },
    {
      name: 'Liderança Executiva',
      order: 2,
      drdTopicItems: [
        {
          name: 'Liderança de Head of Engineering e Área',
          description: 'Desenvolvimento de líderes sênior e definição de cultura de engenharia.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Board e Investidores',
          description: 'Comunicação de estratégia técnica, riscos e oportunidades para o board e investidores.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Escala e Operação',
      order: 3,
      drdTopicItems: [
        {
          name: 'Escalabilidade e Confiabilidade',
          description: 'Garantir que a plataforma suporte o crescimento do negócio com segurança e performance.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Orçamento e Parcerias Tecnológicas',
          description: 'Gestão de investimento em tecnologia e relações com fornecedores estratégicos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
