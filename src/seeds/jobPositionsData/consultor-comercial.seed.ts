import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Consultor Comercial',
  cbo_code: '3541-20',
  base_salary: 0,
  description: 'Atua na venda consultiva de serviços e soluções complexas, realizando diagnósticos, mapeamento de necessidades e construção de propostas técnicas personalizadas para o cliente.',
  metrics: [
    {
      name: 'Taxa de Conversão de Diagnóstico para Proposta',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficácia de Processo',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 20.0 },
        { drd_level_order: 2, min_score: 25.0 },
        { drd_level_order: 3, min_score: 30.0 },
        { drd_level_order: 4, min_score: 35.0 },
        { drd_level_order: 5, min_score: 40.0 },
        { drd_level_order: 6, min_score: 45.0 },
        { drd_level_order: 7, min_score: 50.0 },
        { drd_level_order: 8, min_score: 55.0 },
        { drd_level_order: 9, min_score: 60.0 },
      ],
    },
    {
      name: 'Ticket Médio de Contratos Fechados',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Performance Financeira',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5000 },
        { drd_level_order: 2, min_score: 7500 },
        { drd_level_order: 3, min_score: 10000 },
        { drd_level_order: 4, min_score: 15000 },
        { drd_level_order: 5, min_score: 20000 },
        { drd_level_order: 6, min_score: 30000 },
        { drd_level_order: 7, min_score: 45000 },
        { drd_level_order: 8, min_score: 60000 },
        { drd_level_order: 9, min_score: 80000 },
      ],
    },
  ],
  topics: [
    {
      name: 'Venda Consultiva e Diagnóstico',
      order: 1,
      drdTopicItems: [
        {
          name: 'Diagnóstico e Levantamento de Necessidades',
          description: 'Habilidade de realizar perguntas investigativas para entender as dores reais do cliente.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Análise de Cenário e Fit de Produto',
          description: 'Capacidade de correlacionar os desafios do cliente com as soluções oferecidas pela empresa.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Engenharia de Proposta e Valor',
      order: 2,
      drdTopicItems: [
        {
          name: 'Elaboração de Propostas Personalizadas',
          description: 'Habilidade em estruturar apresentações que foquem no ROI e nos benefícios para o cliente.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Storytelling Comercial',
          description: 'Capacidade de usar narrativas e casos de sucesso para gerar credibilidade e desejo.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Gestão de Stakeholders e Negociação',
      order: 3,
      drdTopicItems: [
        {
          name: 'Identificação de Tomadores de Decisão',
          description: 'Habilidade de navegar em hierarquias complexas e influenciar múltiplos decisores.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Negociação Baseada em Valor (Não em Preço)',
          description: 'Capacidade de defender margens e focar na entrega técnica em vez de descontos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Conhecimento Técnico e Mercado',
      order: 4,
      drdTopicItems: [
        {
          name: 'Autoridade e Thought Leadership',
          description: 'Domínio profundo do setor de atuação para atuar como um consultor de confiança.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        },
        {
          name: 'Benchmarking e Concorrência',
          description: 'Conhecimento das soluções alternativas do mercado para posicionamento estratégico.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
