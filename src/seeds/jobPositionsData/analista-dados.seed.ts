import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Analista de Dados',
  cbo_code: '2112-10',
  base_salary: 0,
  description: 'Profissional responsável por coletar, processar e realizar análises estatísticas de grandes volumes de dados, transformando-os em visualizações e insights estratégicos para apoiar a tomada de decisão.',
  metrics: [
    {
      name: 'Dashboards e Relatórios Entregues',
      order: 1,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Entrega',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 1.0 },
        { drd_level_order: 2, min_score: 2.0 },
        { drd_level_order: 3, min_score: 2.0 },
        { drd_level_order: 4, min_score: 3.0 },
        { drd_level_order: 5, min_score: 3.0 },
        { drd_level_order: 6, min_score: 4.0 },
        { drd_level_order: 7, min_score: 4.0 },
        { drd_level_order: 8, min_score: 5.0 },
        { drd_level_order: 9, min_score: 6.0 },
      ],
    },
    {
      name: 'Acurácia dos Modelos/Análises',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 85.0 },
        { drd_level_order: 2, min_score: 87.0 },
        { drd_level_order: 3, min_score: 90.0 },
        { drd_level_order: 4, min_score: 92.0 },
        { drd_level_order: 5, min_score: 93.0 },
        { drd_level_order: 6, min_score: 95.0 },
        { drd_level_order: 7, min_score: 96.0 },
        { drd_level_order: 8, min_score: 97.0 },
        { drd_level_order: 9, min_score: 98.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Manipulação e Tratamento de Dados',
      order: 1,
      drdTopicItems: [
        {
          name: 'Linguagem SQL',
          description: 'Domínio de consultas complexas, joins, subqueries e otimização de busca em bancos de dados relacionais.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'ETL e Limpeza de Dados',
          description: 'Capacidade de extrair, transformar e carregar dados de diferentes fontes, garantindo a integridade e qualidade da informação.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Visualização e Storytelling',
      order: 2,
      drdTopicItems: [
        {
          name: 'Ferramentas de BI (Power BI/Tableau)',
          description: 'Criação de dashboards interativos e intuitivos que facilitam a leitura de indicadores chave de performance.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 4 : 5 })),
        },
        {
          name: 'Data Storytelling',
          description: 'Habilidade de comunicar resultados e insights técnicos de forma clara para stakeholders não técnicos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 3 })),
        }
      ],
    },
    {
      name: 'Estatística e Programação',
      order: 3,
      drdTopicItems: [
        {
          name: 'Análise Estatística',
          description: 'Conhecimento em estatística descritiva, inferencial, testes de hipótese e correlações.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Python ou R para Dados',
          description: 'Uso de bibliotecas específicas (Pandas, Numpy, Scikit-learn) para análise exploratória e automação.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 2 : 5 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
