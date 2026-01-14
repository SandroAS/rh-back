import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Product Owner',
  cbo_code: '2124-05',
  base_salary: 0,
  description: 'Responsável por definir a visão do produto, gerenciar o backlog e priorizar entregas para garantir o máximo valor de negócio e satisfação do usuário.',
  metrics: [
    {
      name: 'Valor de Negócio Entregue',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficácia de Produto',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 50.0 },
        { drd_level_order: 2, min_score: 60.0 },
        { drd_level_order: 3, min_score: 70.0 },
        { drd_level_order: 4, min_score: 80.0 },
        { drd_level_order: 5, min_score: 85.0 },
        { drd_level_order: 6, min_score: 90.0 },
        { drd_level_order: 7, min_score: 93.0 },
        { drd_level_order: 8, min_score: 95.0 },
        { drd_level_order: 9, min_score: 98.0 },
      ],
    },
    {
      name: 'Taxa de Rejeição de Histórias (Re-work)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Qualidade do Backlog',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 30.0 },
        { drd_level_order: 2, min_score: 25.0 },
        { drd_level_order: 3, min_score: 20.0 },
        { drd_level_order: 4, min_score: 15.0 },
        { drd_level_order: 5, min_score: 10.0 },
        { drd_level_order: 6, min_score: 8.0 },
        { drd_level_order: 7, min_score: 5.0 },
        { drd_level_order: 8, min_score: 3.0 },
        { drd_level_order: 9, min_score: 1.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Gestão de Backlog e Priorização',
      order: 1,
      drdTopicItems: [
        {
          name: 'Refinamento e Escrita de User Stories',
          description: 'Capacidade de transformar necessidades complexas em histórias de usuário claras, com critérios de aceite bem definidos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Técnicas de Priorização (MoSCoW, RICE)',
          description: 'Uso de frameworks para decidir o que deve ser construído primeiro com base em esforço e impacto.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 2 : 5 })),
        }
      ],
    },
    {
      name: 'Estratégia e Descoberta',
      order: 2,
      drdTopicItems: [
        {
          name: 'Product Discovery',
          description: 'Processo de entendimento do problema do usuário antes da construção da solução (UX Research, prototipagem).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 1 : 4 })),
        },
        {
          name: 'Análise de Métricas de Produto (Churn, NPS)',
          description: 'Acompanhamento de dados de uso para validar hipóteses e guiar decisões baseadas em evidências.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 4 })),
        }
      ],
    },
    {
      name: 'Relacionamento e Stakeholders',
      order: 3,
      drdTopicItems: [
        {
          name: 'Gestão de Expectativas',
          description: 'Comunicação fluida com as partes interessadas para alinhar prazos, riscos e mudanças de escopo.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Visão do Produto e Roadmap',
          description: 'Habilidade de comunicar o propósito do produto a longo prazo e manter o time motivado com a direção escolhida.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
