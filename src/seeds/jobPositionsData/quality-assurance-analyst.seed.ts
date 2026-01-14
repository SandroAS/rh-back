import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Quality Assurance Analyst',
  cbo_code: '2124-20',
  base_salary: 0,
  description: 'Responsável por garantir a excelência do produto final, atuando na prevenção de defeitos, automação de testes e promoção da cultura de qualidade no ciclo de desenvolvimento.',
  metrics: [
    {
      name: 'Cobertura de Automação',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência de Testes',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 10.0 },
        { drd_level_order: 2, min_score: 25.0 },
        { drd_level_order: 3, min_score: 40.0 },
        { drd_level_order: 4, min_score: 55.0 },
        { drd_level_order: 5, min_score: 70.0 },
        { drd_level_order: 6, min_score: 80.0 },
        { drd_level_order: 7, min_score: 85.0 },
        { drd_level_order: 8, min_score: 90.0 },
        { drd_level_order: 9, min_score: 95.0 },
      ],
    },
    {
      name: 'Defeitos em Produção (Leakage)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Qualidade do Produto',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 10.0 },
        { drd_level_order: 2, min_score: 8.0 },
        { drd_level_order: 3, min_score: 6.0 },
        { drd_level_order: 4, min_score: 4.0 },
        { drd_level_order: 5, min_score: 3.0 },
        { drd_level_order: 6, min_score: 2.0 },
        { drd_level_order: 7, min_score: 1.0 },
        { drd_level_order: 8, min_score: 0.0 },
        { drd_level_order: 9, min_score: 0.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Automação e Ferramentas',
      order: 1,
      drdTopicItems: [
        {
          name: 'Automação de Testes (E2E/API)',
          description: 'Desenvolvimento e manutenção de scripts de automação para garantir regressões rápidas e confiáveis.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 2 : 4 })),
        },
        {
          name: 'Performance e Carga',
          description: 'Capacidade de realizar testes não funcionais para garantir a resiliência do sistema sob estresse.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 1 : 4 })),
        }
      ],
    },
    {
      name: 'Processos de Qualidade',
      order: 2,
      drdTopicItems: [
        {
          name: 'Estratégia de Teste (Shift-Left)',
          description: 'Atuação desde a concepção dos requisitos para prevenir erros antes mesmo do início do desenvolvimento.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Gestão de Defeitos e Bugs',
          description: 'Eficiência na triagem, reporte e acompanhamento do ciclo de vida dos bugs encontrados.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Mentalidade e Cultura',
      order: 3,
      drdTopicItems: [
        {
          name: 'User Experience (UX) Watchdog',
          description: 'Garantir que as funcionalidades entregues atendam aos critérios de usabilidade e acessibilidade.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 3 })),
        },
        {
          name: 'Continuous Testing no CI/CD',
          description: 'Integração dos testes automatizados nas esteiras de deploy para feedback contínuo ao time.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
