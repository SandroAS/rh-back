import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'SRE',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Site Reliability Engineer: focado em confiabilidade, observabilidade e operação dos sistemas. Equilibra engenharia de software com práticas de operações para manter os serviços estáveis e escaláveis.',
  metrics: [
    {
      name: 'Disponibilidade (SLA/SLO)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Confiabilidade',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 99.0 },
        { drd_level_order: 2, min_score: 99.5 },
        { drd_level_order: 3, min_score: 99.9 },
        { drd_level_order: 4, min_score: 99.95 },
        { drd_level_order: 5, min_score: 99.99 },
        { drd_level_order: 6, min_score: 99.995 },
        { drd_level_order: 7, min_score: 99.999 },
        { drd_level_order: 8, min_score: 99.9995 },
        { drd_level_order: 9, min_score: 99.9999 },
      ],
    },
    {
      name: 'MTTR (Mean Time to Recovery)',
      order: 2,
      type: MetricType.DURATION_MINUTES,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Resiliência',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 120 },
        { drd_level_order: 2, min_score: 90 },
        { drd_level_order: 3, min_score: 60 },
        { drd_level_order: 4, min_score: 45 },
        { drd_level_order: 5, min_score: 30 },
        { drd_level_order: 6, min_score: 20 },
        { drd_level_order: 7, min_score: 15 },
        { drd_level_order: 8, min_score: 10 },
        { drd_level_order: 9, min_score: 5 },
      ],
    },
  ],
  topics: [
    {
      name: 'Confiabilidade e SLOs',
      order: 1,
      drdTopicItems: [
        {
          name: 'Definição de SLOs, SLIs e Error Budgets',
          description: 'Estabelecimento de metas de confiabilidade e uso do error budget para priorização.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Post-Mortems e Melhoria Contínua',
          description: 'Condução de análises de incidentes e implementação de ações para evitar recorrência.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Observabilidade e On-Call',
      order: 2,
      drdTopicItems: [
        {
          name: 'Monitoramento, Alerting e Dashboards',
          description: 'Stack de métricas, logs e traces (Prometheus, Grafana, ELK, etc.) e alertas acionáveis.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'On-Call e Resposta a Incidentes',
          description: 'Participação em plantões, runbooks e comunicação durante incidentes.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Código e Automação',
      order: 3,
      drdTopicItems: [
        {
          name: 'Automação Operacional (Toil Reduction)',
          description: 'Eliminação de trabalho manual repetitivo através de código e ferramentas.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Capacity Planning e Escalabilidade',
          description: 'Planejamento de capacidade, auto-scaling e testes de carga.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
