import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Staff QA Engineer',
  cbo_code: '2124-20',
  base_salary: 0,
  description:
    'QA sênior com impacto além do squad: define padrões de automação e qualidade, influencia múltiplos times e resolve os desafios mais complexos de garantia de qualidade.',
  metrics: [
    {
      name: 'Cobertura de Automação',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência de Testes',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 75.0 },
        { drd_level_order: 2, min_score: 80.0 },
        { drd_level_order: 3, min_score: 85.0 },
        { drd_level_order: 4, min_score: 88.0 },
        { drd_level_order: 5, min_score: 90.0 },
        { drd_level_order: 6, min_score: 92.0 },
        { drd_level_order: 7, min_score: 95.0 },
        { drd_level_order: 8, min_score: 97.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
    {
      name: 'Impacto em Múltiplos Produtos/Squads',
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
      name: 'Automação e Arquitetura de Testes',
      order: 1,
      drdTopicItems: [
        {
          name: 'Arquitetura de Frameworks de Teste',
          description: 'Desenho de soluções de automação reutilizáveis e escaláveis entre times.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Performance, Segurança e Testes Não-Funcionais',
          description: 'Estratégias de teste de carga, segurança (SAST/DAST) e acessibilidade.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        },
      ],
    },
    {
      name: 'Processos e Qualidade em Escala',
      order: 2,
      drdTopicItems: [
        {
          name: 'Governança de Qualidade',
          description: 'Definição de métricas, SLAs e processos de qualidade adotados por vários squads.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Shift-Left e Colaboração com Dev',
          description: 'Promoção da cultura de qualidade desde o design e code review.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Liderança Técnica em QA',
      order: 3,
      drdTopicItems: [
        {
          name: 'Mentoria de QA Leads e Analistas',
          description: 'Desenvolvimento de outros QAs em automação avançada e estratégia.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Resolução de Problemas Complexos de Qualidade',
          description: 'Abordagem de flakiness, cobertura em sistemas legados e testes em produção controlada.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
