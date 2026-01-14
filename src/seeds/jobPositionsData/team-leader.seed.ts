import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Team Leader',
  cbo_code: '1425-05',
  base_salary: 0,
  description: 'Liderança técnica e operacional de squads, focado na gestão de pessoas, resolução de impedimentos e garantia da qualidade das entregas.',
  metrics: [
    {
      name: 'eNPS do Time (Employee Net Promoter Score)',
      order: 1,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Gestão de Pessoas',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 50 },
        { drd_level_order: 2, min_score: 55 },
        { drd_level_order: 3, min_score: 60 },
        { drd_level_order: 4, min_score: 65 },
        { drd_level_order: 5, min_score: 70 },
        { drd_level_order: 6, min_score: 75 },
        { drd_level_order: 7, min_score: 80 },
        { drd_level_order: 8, min_score: 85 },
        { drd_level_order: 9, min_score: 90 },
      ],
    },
    {
      name: 'Throughput ou Vazão de Entrega (Sprint)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência de Entrega',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 75.0 },
        { drd_level_order: 2, min_score: 80.0 },
        { drd_level_order: 3, min_score: 85.0 },
        { drd_level_order: 4, min_score: 88.0 },
        { drd_level_order: 5, min_score: 90.0 },
        { drd_level_order: 6, min_score: 92.0 },
        { drd_level_order: 7, min_score: 94.0 },
        { drd_level_order: 8, min_score: 96.0 },
        { drd_level_order: 9, min_score: 98.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Gestão de Pessoas e Desenvolvimento',
      order: 1,
      drdTopicItems: [
        {
          name: 'Realização de 1:1s e Feedback',
          description: 'Consistência e qualidade nas reuniões individuais, focando em carreira e desempenho.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Mentoria e Coaching',
          description: 'Habilidade de identificar gaps de conhecimento no time e promover o crescimento técnico.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Agilidade e Processos',
      order: 2,
      drdTopicItems: [
        {
          name: 'Facilitação de Ritos Ágeis',
          description: 'Domínio de Scrum/Kanban para otimizar dailies, plannings e retrospectivas.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Remoção de Impedimentos',
          description: 'Agilidade em desbloquear o time e negociar com stakeholders externos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Visão de Negócio e Estratégia',
      order: 3,
      drdTopicItems: [
        {
          name: 'Alinhamento com OKRs',
          description: 'Capacidade de conectar as tarefas técnicas do dia a dia com os objetivos da empresa.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Gestão de Stakeholders',
          description: 'Comunicação clara de prazos, riscos e progresso para diretores e clientes.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        }
      ],
    },
    {
      name: 'Cultura e Retenção',
      order: 4,
      drdTopicItems: [
        {
          name: 'Resolução de Conflitos',
          description: 'Habilidade em mediar divergências internas e manter um clima psicológico seguro.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Contratação e Onboarding',
          description: 'Participação ativa na seleção de novos talentos e integração rápida na cultura.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 3 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
