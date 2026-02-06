import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Customer Success',
  cbo_code: '2525-45', // CBO aproximado para Analista de Gestão de Clientes
  base_salary: 0,
  description: 'Responsável por garantir que os clientes alcancem seus objetivos com o produto, focando na retenção, satisfação e expansão da receita dentro da base de clientes.',
  metrics: [
    {
      name: 'Churn Rate (Mensal)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Retenção',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5.0 },
        { drd_level_order: 2, min_score: 4.5 },
        { drd_level_order: 3, min_score: 4.0 },
        { drd_level_order: 4, min_score: 3.5 },
        { drd_level_order: 5, min_score: 3.0 },
        { drd_level_order: 6, min_score: 2.5 },
        { drd_level_order: 7, min_score: 2.0 },
        { drd_level_order: 8, min_score: 1.5 },
        { drd_level_order: 9, min_score: 1.0 },
      ],
    },
    {
      name: 'Net Promoter Score (NPS)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Satisfação',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 50 },
        { drd_level_order: 2, min_score: 55 },
        { drd_level_order: 3, min_score: 60 },
        { drd_level_order: 4, min_score: 65 },
        { drd_level_order: 5, min_score: 70 },
        { drd_level_order: 6, min_score: 75 },
        { drd_level_order: 7, min_score: 80 },
        { drd_level_order: 8, min_score: 85 },
        { drd_level_order: 9, min_score: 90 },
      ],
    },
    {
      name: 'Expansão de Receita (Upsell/Cross-sell)',
      order: 3,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Crescimento',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 1.0 },
        { drd_level_order: 2, min_score: 2.0 },
        { drd_level_order: 3, min_score: 3.0 },
        { drd_level_order: 4, min_score: 4.0 },
        { drd_level_order: 5, min_score: 5.0 },
        { drd_level_order: 6, min_score: 7.0 },
        { drd_level_order: 7, min_score: 9.0 },
        { drd_level_order: 8, min_score: 12.0 },
        { drd_level_order: 9, min_score: 15.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Gestão da Jornada do Cliente',
      order: 1,
      drdTopicItems: [
        {
          name: 'Onboarding Eficiente',
          description: 'Habilidade em conduzir o cliente nos primeiros passos para garantir o "Time-to-Value".',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Análise de Health Score',
          description: 'Monitoramento de indicadores de saúde e engajamento para prever e evitar cancelamentos.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Negociação e Expansão',
      order: 2,
      drdTopicItems: [
        {
          name: 'Identificação de Oportunidades (Upsell)',
          description: 'Capacidade de oferecer módulos ou planos superiores baseados na dor do cliente.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 3 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Quarterly Business Reviews (QBR)',
          description: 'Execução de reuniões estratégicas para demonstrar ROI e alinhar próximos passos.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 1 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Habilidades Consultivas',
      order: 3,
      drdTopicItems: [
        {
          name: 'Escuta Ativa e Empatia',
          description: 'Entender a real necessidade do cliente antes de propor soluções técnicas.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Conhecimento Técnico do Produto',
          description: 'Profundidade técnica para resolver problemas sem necessidade constante de suporte.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
