import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Principal Software Engineer',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Máximo nível individual contributor de engenharia: define a direção técnica da empresa, resolve os problemas mais críticos e é referência para toda a organização.',
  metrics: [
    {
      name: 'Impacto em Resultados de Negócio (Receita/Eficiência)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Impacto Estratégico',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5.0 },
        { drd_level_order: 2, min_score: 10.0 },
        { drd_level_order: 3, min_score: 15.0 },
        { drd_level_order: 4, min_score: 20.0 },
        { drd_level_order: 5, min_score: 25.0 },
        { drd_level_order: 6, min_score: 30.0 },
        { drd_level_order: 7, min_score: 35.0 },
        { drd_level_order: 8, min_score: 40.0 },
        { drd_level_order: 9, min_score: 50.0 },
      ],
    },
    {
      name: 'Visão e Roadmap Técnico da Empresa',
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
      name: 'Estratégia Técnica da Organização',
      order: 1,
      drdTopicItems: [
        {
          name: 'Visão de Arquitetura de Longo Prazo',
          description: 'Definição da direção técnica da empresa para os próximos anos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Trade-offs Estratégicos (Build vs Buy, Tech Debt)',
          description: 'Decisões que impactam custo, velocidade e sustentabilidade em nível organizacional.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Influência e Desenvolvimento de Líderes',
      order: 2,
      drdTopicItems: [
        {
          name: 'Mentoria de Staff Engineers e Tech Leads',
          description: 'Elevação do nível técnico dos principais líderes de engenharia.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Evangelização Técnica Interna e Externa',
          description: 'Representação da empresa em eventos, blogs e decisões de padrões de mercado.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 5 })),
        },
      ],
    },
    {
      name: 'Resolução de Problemas de Maior Complexidade',
      order: 3,
      drdTopicItems: [
        {
          name: 'Problemas que Bloqueiam a Empresa',
          description: 'Atuação nos gargalos técnicos mais críticos com impacto em receita ou escala.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Inovação e P&D',
          description: 'Exploração de novas tecnologias e abordagens que podem definir o futuro do produto.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 2 : 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
