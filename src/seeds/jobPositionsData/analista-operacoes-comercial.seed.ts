import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Analista de Operações e Comercial',
  cbo_code: '2521-05',
  base_salary: 0,
  description: 'Responsável por integrar e otimizar o fluxo de informações e processos entre as áreas de vendas e operações, garantindo eficiência na entrega e suporte estratégico ao crescimento comercial.',
  metrics: [
    {
      name: 'Taxa de Conversão de Oportunidades',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Comercial',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 10.0 },
        { drd_level_order: 2, min_score: 12.0 },
        { drd_level_order: 3, min_score: 15.0 },
        { drd_level_order: 4, min_score: 18.0 },
        { drd_level_order: 5, min_score: 20.0 },
        { drd_level_order: 6, min_score: 22.0 },
        { drd_level_order: 7, min_score: 25.0 },
        { drd_level_order: 8, min_score: 28.0 },
        { drd_level_order: 9, min_score: 30.0 },
      ],
    },
    {
      name: 'Lead Time de Processamento (Dias)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 7.0 },
        { drd_level_order: 2, min_score: 6.0 },
        { drd_level_order: 3, min_score: 5.0 },
        { drd_level_order: 4, min_score: 4.5 },
        { drd_level_order: 5, min_score: 4.0 },
        { drd_level_order: 6, min_score: 3.5 },
        { drd_level_order: 7, min_score: 3.0 },
        { drd_level_order: 8, min_score: 2.5 },
        { drd_level_order: 9, min_score: 2.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Gestão de Processos e Eficiência',
      order: 1,
      drdTopicItems: [
        {
          name: 'Mapeamento e Otimização de Fluxos',
          description: 'Capacidade de identificar gargalos entre o fechamento da venda e a entrega operacional, propondo melhorias.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 5 })),
        },
        {
          name: 'Utilização de Ferramentas (CRM/ERP)',
          description: 'Domínio das ferramentas de gestão para garantir integridade de dados e automação de tarefas.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Inteligência Comercial',
      order: 2,
      drdTopicItems: [
        {
          name: 'Análise de Dados e Indicadores',
          description: 'Interpretação de métricas de vendas e operacionais para gerar insights de novos negócios ou retenção.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Previsibilidade e Forecasting',
          description: 'Apoio na construção de metas baseadas na capacidade operacional instalada e demanda de mercado.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 5 })),
        }
      ],
    },
    {
      name: 'Soft Skills e Interface',
      order: 3,
      drdTopicItems: [
        {
          name: 'Comunicação Interdepartamental',
          description: 'Habilidade de mediar conflitos e alinhar expectativas entre o time de vendas e o time de operações.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Foco no Cliente (Customer Centricity)',
          description: 'Garantir que a fluidez interna se traduza em uma melhor experiência e cumprimento de prazos para o cliente.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
