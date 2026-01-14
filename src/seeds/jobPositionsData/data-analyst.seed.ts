import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Data Analyst',
  cbo_code: '2112-10',
  base_salary: 0,
  description: 'Responsável por coletar, processar e realizar análises estatísticas de dados para identificar padrões e tendências que auxiliem na tomada de decisão estratégica.',
  metrics: [
    {
      name: 'Precisão dos Dashboards e Relatórios',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade Técnica',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 90.0 },
        { drd_level_order: 2, min_score: 92.0 },
        { drd_level_order: 3, min_score: 94.0 },
        { drd_level_order: 4, min_score: 96.0 },
        { drd_level_order: 5, min_score: 98.0 },
        { drd_level_order: 6, min_score: 99.0 },
        { drd_level_order: 7, min_score: 99.5 },
        { drd_level_order: 8, min_score: 99.8 },
        { drd_level_order: 9, min_score: 100.0 },
      ],
    },
    {
      name: 'Tempo Médio de Resposta (SLA de Pedido de Dados)',
      order: 2,
      type: MetricType.DURATION_HOURS,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Eficiência Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 72 },
        { drd_level_order: 2, min_score: 48 },
        { drd_level_order: 3, min_score: 36 },
        { drd_level_order: 4, min_score: 24 },
        { drd_level_order: 5, min_score: 18 },
        { drd_level_order: 6, min_score: 12 },
        { drd_level_order: 7, min_score: 8 },
        { drd_level_order: 8, min_score: 6 },
        { drd_level_order: 9, min_score: 4 },
      ],
    },
  ],
  topics: [
    {
      name: 'Manipulação e Extração de Dados',
      order: 1,
      drdTopicItems: [
        {
          name: 'Domínio de SQL Avançado',
          description: 'Habilidade em realizar consultas complexas, joins, Window Functions e otimização de queries.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'ETL e Limpeza de Dados (Data Wrangling)',
          description: 'Capacidade de tratar dados inconsistentes e estruturar pipelines simples para análise.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Análise Estatística e Modelagem',
      order: 2,
      drdTopicItems: [
        {
          name: 'Estatística Descritiva e Inferencial',
          description: 'Aplicação de testes de hipótese, correlações, distribuições e análise de variância.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        },
        {
          name: 'Modelagem Preditiva Básica',
          description: 'Conhecimento em regressões lineares/logísticas e técnicas de clustering para segmentação.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 3 })),
        }
      ],
    },
    {
      name: 'Visualização e Storytelling',
      order: 3,
      drdTopicItems: [
        {
          name: 'Construção de Dashboards (BI)',
          description: 'Criação de visualizações intuitivas em ferramentas como Power BI, Tableau ou Looker.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Comunicação de Insights para Negócio',
          description: 'Capacidade de traduzir termos técnicos em recomendações estratégicas para gestores.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Linguagens de Programação e Ferramentas',
      order: 4,
      drdTopicItems: [
        {
          name: 'Análise com Python ou R',
          description: 'Uso de bibliotecas como Pandas, NumPy, Scikit-learn ou Tidyverse para análise profunda.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Data Governance e Ética',
          description: 'Conhecimento de LGPD e boas práticas de segurança e privacidade dos dados.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 3 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
