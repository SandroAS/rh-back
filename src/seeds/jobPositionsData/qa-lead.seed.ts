import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'QA Lead',
  cbo_code: '2124-20',
  base_salary: 0,
  description:
    'Liderança técnica do time de qualidade: define estratégia de testes, automação e processos de QA, garantindo que o produto atinja os padrões de qualidade esperados.',
  metrics: [
    {
      name: 'Cobertura de Automação',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência de Testes',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 50.0 },
        { drd_level_order: 2, min_score: 60.0 },
        { drd_level_order: 3, min_score: 70.0 },
        { drd_level_order: 4, min_score: 80.0 },
        { drd_level_order: 5, min_score: 85.0 },
        { drd_level_order: 6, min_score: 90.0 },
        { drd_level_order: 7, min_score: 92.0 },
        { drd_level_order: 8, min_score: 95.0 },
        { drd_level_order: 9, min_score: 98.0 },
      ],
    },
    {
      name: 'Defeitos em Produção (Leakage)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Qualidade do Produto',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5.0 },
        { drd_level_order: 2, min_score: 3.0 },
        { drd_level_order: 3, min_score: 2.0 },
        { drd_level_order: 4, min_score: 1.0 },
        { drd_level_order: 5, min_score: 0.5 },
        { drd_level_order: 6, min_score: 0.0 },
        { drd_level_order: 7, min_score: 0.0 },
        { drd_level_order: 8, min_score: 0.0 },
        { drd_level_order: 9, min_score: 0.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Estratégia e Processos de QA',
      order: 1,
      drdTopicItems: [
        {
          name: 'Estratégia de Teste (Piramide, Shift-Left)',
          description: 'Definição de abordagem de testes para o time/squad (unit, integration, E2E).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Gestão de Qualidade e Métricas',
          description: 'Acompanhamento de indicadores de qualidade e definição de SLAs de release.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Automação e Ferramentas',
      order: 2,
      drdTopicItems: [
        {
          name: 'Frameworks de Automação (E2E/API)',
          description: 'Escolha e evolução de ferramentas de automação (Cypress, Playwright, RestAssured).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Integração CI/CD e Quality Gates',
          description: 'Garantir que os testes façam parte do pipeline e bloqueiem deploys quando necessário.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Liderança e Colaboração',
      order: 3,
      drdTopicItems: [
        {
          name: 'Mentoria do Time de QA',
          description: 'Desenvolvimento de QAs em automação, processos e pensamento crítico.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Colaboração com Dev e Product',
          description: 'Parceria com engenharia e produto para critérios de aceite e qualidade desde o refinamento.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
