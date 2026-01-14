import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'UX Analyst',
  cbo_code: '2124-05',
  base_salary: 0,
  description: 'Responsável por analisar, projetar e otimizar a experiência do usuário em produtos digitais, utilizando metodologias de pesquisa, testes de usabilidade e design centrado no usuário.',
  metrics: [
    {
      name: 'Taxa de Sucesso na Tarefa (Task Success Rate)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Usabilidade',
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
      name: 'NPS / CSAT do Produto',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Satisfação',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 30.0 },
        { drd_level_order: 2, min_score: 40.0 },
        { drd_level_order: 3, min_score: 50.0 },
        { drd_level_order: 4, min_score: 60.0 },
        { drd_level_order: 5, min_score: 70.0 },
        { drd_level_order: 6, min_score: 75.0 },
        { drd_level_order: 7, min_score: 80.0 },
        { drd_level_order: 8, min_score: 85.0 },
        { drd_level_order: 9, min_score: 90.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Pesquisa e Estratégia (UX Research)',
      order: 1,
      drdTopicItems: [
        {
          name: 'Pesquisas Quantitativas e Qualitativas',
          description: 'Aplicação de entrevistas, questionários, card sorting e análise de personas para entender as necessidades dos usuários.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 2 : 5 })),
        },
        {
          name: 'Análise de Fluxo e Jornada do Usuário',
          description: 'Mapeamento de touchpoints, blueprints de serviço e identificação de pontos de fricção no uso do produto.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Design e Prototipagem',
      order: 2,
      drdTopicItems: [
        {
          name: 'Prototipagem de Baixa e Alta Fidelidade',
          description: 'Criação de wireframes e protótipos navegáveis utilizando ferramentas como Figma, Adobe XD ou Sketch.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Design System e Componentização',
          description: 'Contribuição e manutenção de bibliotecas de componentes para garantir consistência visual e funcional.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        }
      ],
    },
    {
      name: 'Validação e Acessibilidade',
      order: 3,
      drdTopicItems: [
        {
          name: 'Testes de Usabilidade e A/B',
          description: 'Execução de testes com usuários reais e análise de dados para validar hipóteses de design.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Acessibilidade Digital (WCAG)',
          description: 'Garantir que os produtos sejam utilizáveis por pessoas com diferentes tipos de deficiência, seguindo padrões internacionais.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
