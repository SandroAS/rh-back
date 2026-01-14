import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Tech Lead',
  cbo_code: '2124-05',
  base_salary: 0,
  description: 'Referência técnica do time, responsável por guiar a arquitetura técnica local, garantir a qualidade da entrega e remover impedimentos tecnológicos do squad.',
  metrics: [
    {
      name: 'Deployment Frequency',
      order: 1,
      type: MetricType.DURATION_WEEKS,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Agilidade de Entrega',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 1.0 },
        { drd_level_order: 2, min_score: 2.0 },
        { drd_level_order: 3, min_score: 3.0 },
        { drd_level_order: 4, min_score: 5.0 },
        { drd_level_order: 5, min_score: 7.0 },
        { drd_level_order: 6, min_score: 10.0 },
        { drd_level_order: 7, min_score: 14.0 },
        { drd_level_order: 8, min_score: 20.0 },
        { drd_level_order: 9, min_score: 30.0 },
      ],
    },
    {
      name: 'Taxa de Escapamento de Bugs',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Qualidade de Software',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 20.0 },
        { drd_level_order: 2, min_score: 15.0 },
        { drd_level_order: 3, min_score: 12.0 },
        { drd_level_order: 4, min_score: 10.0 },
        { drd_level_order: 5, min_score: 8.0 },
        { drd_level_order: 6, min_score: 5.0 },
        { drd_level_order: 7, min_score: 3.0 },
        { drd_level_order: 8, min_score: 2.0 },
        { drd_level_order: 9, min_score: 1.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Arquitetura e Design de Software',
      order: 1,
      drdTopicItems: [
        {
          name: 'Arquitetura de Squad',
          description: 'Capacidade de desenhar soluções técnicas que respeitem os requisitos não funcionais dentro do escopo do time.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Gestão de Débito Técnico',
          description: 'Equilíbrio entre a velocidade de entrega e a sustentabilidade do código a longo prazo.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Liderança de Pessoas e Processos',
      order: 2,
      drdTopicItems: [
        {
          name: 'Code Review e Mentoria',
          description: 'Garantia de que os processos de revisão de código sejam educativos e construtivos para o crescimento do time.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Colaboração com Product Owner',
          description: 'Apoio na priorização técnica do backlog e refinamento de histórias de usuário.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 4 })),
        }
      ],
    },
    {
      name: 'Práticas de Engenharia',
      order: 3,
      drdTopicItems: [
        {
          name: 'CI/CD e Automação',
          description: 'Implementação e otimização das esteiras de integração e entrega contínua do squad.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Observabilidade e Monitoramento',
          description: 'Garantir que o time tenha visibilidade total sobre o comportamento da aplicação em produção.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 2 : 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
