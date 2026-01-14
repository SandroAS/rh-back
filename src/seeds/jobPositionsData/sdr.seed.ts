import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Sales Development Representative (SDR)',
  cbo_code: '2531-15',
  base_salary: 0,
  description: 'Responsável pela prospecção ativa, negociação e fechamento de novos negócios, mantendo o pipeline de vendas saudável e alinhado às metas da empresa.',
  metrics: [
    {
      name: 'Taxa de Conversão (Lead para Close)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência de Vendas',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 15.0 },
        { drd_level_order: 2, min_score: 18.0 },
        { drd_level_order: 3, min_score: 20.0 },
        { drd_level_order: 4, min_score: 22.0 },
        { drd_level_order: 5, min_score: 25.0 },
        { drd_level_order: 6, min_score: 28.0 },
        { drd_level_order: 7, min_score: 30.0 },
        { drd_level_order: 8, min_score: 32.0 },
        { drd_level_order: 9, min_score: 35.0 },
      ],
    },
    {
      name: 'Atingimento da Meta Mensal',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Resultados Financeiros',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 80.0 },
        { drd_level_order: 2, min_score: 85.0 },
        { drd_level_order: 3, min_score: 90.0 },
        { drd_level_order: 4, min_score: 95.0 },
        { drd_level_order: 5, min_score: 100.0 },
        { drd_level_order: 6, min_score: 105.0 },
        { drd_level_order: 7, min_score: 110.0 },
        { drd_level_order: 8, min_score: 115.0 },
        { drd_level_order: 9, min_score: 120.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Negociação e Persuasão',
      order: 1,
      drdTopicItems: [
        {
          name: 'Técnicas de Fechamento e Contorno de Objeções',
          description: 'Habilidade em identificar gatilhos mentais e transformar negativas em oportunidades de negócio.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Vendas Consultivas (Spin Selling)',
          description: 'Capacidade de entender a dor do cliente e apresentar a solução como investimento, não custo.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Gestão de Pipeline e Processos',
      order: 2,
      drdTopicItems: [
        {
          name: 'Domínio de CRM',
          description: 'Manutenção rigorosa do funil de vendas e registro de interações para previsibilidade de receita.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Previsibilidade (Sales Forecasting)',
          description: 'Habilidade em projetar fechamentos com assertividade para a diretoria.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Networking e Parcerias',
      order: 3,
      drdTopicItems: [
        {
          name: 'Prospecção Estratégica',
          description: 'Capacidade de abrir portas em contas de alto valor (Key Accounts) através de relacionamentos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 5 })),
        },
        {
          name: 'Análise de Mercado e Concorrência',
          description: 'Conhecimento profundo dos players do setor para posicionar os diferenciais competitivos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Apresentação e Comunicação',
      order: 4,
      drdTopicItems: [
        {
          name: 'Oratória e Pitch de Vendas',
          description: 'Habilidade de realizar apresentações impactantes para stakeholders e C-Levels.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Follow-up Estratégico',
          description: 'Persistência inteligente para manter o lead engajado sem ser inconveniente.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
