import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Supervisor Comercial',
  cbo_code: '1423-15',
  base_salary: 0,
  description: 'Responsável por liderar a equipe de vendas, monitorar indicadores de performance, realizar treinamentos de campo e garantir o cumprimento das metas globais da unidade.',
  metrics: [
    {
      name: 'Percentual da Equipe que Bateu Meta',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Gestão de Talentos',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 50.0 },
        { drd_level_order: 2, min_score: 55.0 },
        { drd_level_order: 3, min_score: 60.0 },
        { drd_level_order: 4, min_score: 65.0 },
        { drd_level_order: 5, min_score: 70.0 },
        { drd_level_order: 6, min_score: 75.0 },
        { drd_level_order: 7, min_score: 80.0 },
        { drd_level_order: 8, min_score: 85.0 },
        { drd_level_order: 9, min_score: 90.0 },
      ],
    },
    {
      name: 'ROI do Canal de Vendas',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência Financeira',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 2.0 },
        { drd_level_order: 2, min_score: 2.5 },
        { drd_level_order: 3, min_score: 3.0 },
        { drd_level_order: 4, min_score: 3.5 },
        { drd_level_order: 5, min_score: 4.0 },
        { drd_level_order: 6, min_score: 4.5 },
        { drd_level_order: 7, min_score: 5.0 },
        { drd_level_order: 8, min_score: 5.5 },
        { drd_level_order: 9, min_score: 6.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Gestão de Equipe e Coaching',
      order: 1,
      drdTopicItems: [
        {
          name: 'Feedback e PDI (Plano de Desenvolvimento Individual)',
          description: 'Habilidade de realizar reuniões de 1:1 e desenvolver talentos subperformantes.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Roleplay e Treinamento de Vendas',
          description: 'Capacidade de simular cenários e treinar a equipe em novas técnicas de negociação.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Análise de Indicadores (BI e Dashboards)',
      order: 2,
      drdTopicItems: [
        {
          name: 'Gestão por Indicadores (KPIs)',
          description: 'Capacidade de diagnosticar em qual etapa do funil a equipe está falhando.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Forecast e Planejamento Tático',
          description: 'Habilidade de prever o resultado do mês e criar planos de ação preventivos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Cultura e Retenção',
      order: 3,
      drdTopicItems: [
        {
          name: 'Engajamento e Clima Organizacional',
          description: 'Manter a motivação da equipe alta mesmo sob pressão por resultados.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Contratação e Onboarding',
          description: 'Habilidade de identificar o perfil ideal e acelerar a rampa de novos vendedores.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        }
      ],
    },
    {
      name: 'Suporte à Negociação',
      order: 4,
      drdTopicItems: [
        {
          name: 'Apoio em Fechamentos (Closer Support)',
          description: 'Habilidade de entrar em reuniões estratégicas para ajudar o vendedor a destravar grandes contas.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Gestão de Conflitos e Ética',
          description: 'Resolver disputas de leads e garantir o cumprimento das políticas comerciais.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
