import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Engineering Manager',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Gestor de um ou mais times de engenharia: responsável por pessoas, desempenho, recrutamento e entrega do squad, em parceria com Tech Lead e Product.',
  metrics: [
    {
      name: 'Retenção e Engajamento do Time',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Gestão de Pessoas',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 70.0 },
        { drd_level_order: 2, min_score: 75.0 },
        { drd_level_order: 3, min_score: 80.0 },
        { drd_level_order: 4, min_score: 85.0 },
        { drd_level_order: 5, min_score: 88.0 },
        { drd_level_order: 6, min_score: 90.0 },
        { drd_level_order: 7, min_score: 92.0 },
        { drd_level_order: 8, min_score: 95.0 },
        { drd_level_order: 9, min_score: 98.0 },
      ],
    },
    {
      name: 'Entrega do Time (Velocity / Predictability)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Resultados',
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
  ],
  topics: [
    {
      name: 'Gestão de Pessoas',
      order: 1,
      drdTopicItems: [
        {
          name: 'One-on-ones e Desenvolvimento (PDI)',
          description: 'Acompanhamento individual, feedback e planos de desenvolvimento.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Recrutamento e Onboarding',
          description: 'Participação em processos seletivos e integração de novos membros.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Operação do Time',
      order: 2,
      drdTopicItems: [
        {
          name: 'Priorização e Capacidade',
          description: 'Alinhamento com Product e stakeholders sobre o que o time pode entregar.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Remoção de Bloqueios',
          description: 'Garantir que o time tenha condições (ferramentas, decisões, dependências) para executar.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Liderança e Cultura',
      order: 3,
      drdTopicItems: [
        {
          name: 'Performance e Avaliação',
          description: 'Avaliação de desempenho, promoções e decisões de carreira.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Cultura Técnica e Segurança Psicológica',
          description: 'Promoção de um ambiente onde o time possa errar, aprender e inovar.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
