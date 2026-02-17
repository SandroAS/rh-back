import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Product Manager',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Responsável por um produto ou área de produto: descobre necessidades do usuário, define roadmap, prioriza backlog e garante que o time entregue o máximo valor.',
  metrics: [
    {
      name: 'Valor de Negócio Entregue',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficácia de Produto',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 55.0 },
        { drd_level_order: 2, min_score: 65.0 },
        { drd_level_order: 3, min_score: 75.0 },
        { drd_level_order: 4, min_score: 82.0 },
        { drd_level_order: 5, min_score: 88.0 },
        { drd_level_order: 6, min_score: 92.0 },
        { drd_level_order: 7, min_score: 95.0 },
        { drd_level_order: 8, min_score: 97.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
    {
      name: 'Adoção e Satisfação do Usuário (NPS/Engagement)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Experiência',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 40.0 },
        { drd_level_order: 2, min_score: 50.0 },
        { drd_level_order: 3, min_score: 60.0 },
        { drd_level_order: 4, min_score: 70.0 },
        { drd_level_order: 5, min_score: 78.0 },
        { drd_level_order: 6, min_score: 85.0 },
        { drd_level_order: 7, min_score: 90.0 },
        { drd_level_order: 8, min_score: 93.0 },
        { drd_level_order: 9, min_score: 96.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Discovery e Estratégia de Produto',
      order: 1,
      drdTopicItems: [
        {
          name: 'Product Discovery',
          description: 'Entendimento do problema do usuário, validação de hipóteses e definição de escopo.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Roadmap e Priorização',
          description: 'Uso de frameworks (RICE, MoSCoW) e alinhamento com stakeholders.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Execução e Backlog',
      order: 2,
      drdTopicItems: [
        {
          name: 'User Stories e Critérios de Aceite',
          description: 'Escrita clara de requisitos e colaboração com design e engenharia.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Métricas e Análise de Produto',
          description: 'Acompanhamento de dados de uso para validar entregas e iterar.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 5 })),
        },
      ],
    },
    {
      name: 'Stakeholders e Comunicação',
      order: 3,
      drdTopicItems: [
        {
          name: 'Gestão de Expectativas',
          description: 'Comunicação com negócio, suporte e clientes sobre prazos e escopo.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Visão do Produto',
          description: 'Comunicação da direção do produto para o time e para a organização.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
