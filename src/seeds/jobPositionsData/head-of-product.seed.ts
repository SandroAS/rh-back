import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Head of Product',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Liderança de toda a área de produto: visão de produto da empresa, múltiplos grupos de PMs, alinhamento com negócio e desenvolvimento da organização de produto.',
  metrics: [
    {
      name: 'Resultado de Produto (Receita/Retenção/NPS)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Impacto',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 55.0 },
        { drd_level_order: 2, min_score: 65.0 },
        { drd_level_order: 3, min_score: 75.0 },
        { drd_level_order: 4, min_score: 82.0 },
        { drd_level_order: 5, min_score: 88.0 },
        { drd_level_order: 6, min_score: 92.0 },
        { drd_level_order: 7, min_score: 95.0 },
        { drd_level_order: 8, min_score: 97.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
    {
      name: 'Saúde da Organização de Produto',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Liderança',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 70.0 },
        { drd_level_order: 2, min_score: 76.0 },
        { drd_level_order: 3, min_score: 82.0 },
        { drd_level_order: 4, min_score: 87.0 },
        { drd_level_order: 5, min_score: 90.0 },
        { drd_level_order: 6, min_score: 93.0 },
        { drd_level_order: 7, min_score: 95.0 },
        { drd_level_order: 8, min_score: 97.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Visão e Estratégia de Produto',
      order: 1,
      drdTopicItems: [
        {
          name: 'Visão de Produto da Empresa',
          description: 'Definição da direção de produto de longo prazo e posicionamento no mercado.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Portfólio e Priorização Estratégica',
          description: 'Decisões sobre quais produtos e iniciativas recebem investimento.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Liderança da Área',
      order: 2,
      drdTopicItems: [
        {
          name: 'Desenvolvimento de GPMs e PMs',
          description: 'Mentoria de líderes de produto e construção de carreira em produto.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Estrutura e Processos de Produto',
          description: 'Organização de squads, rituais e padrões de discovery e entrega.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'C-Level e Negócio',
      order: 3,
      drdTopicItems: [
        {
          name: 'Alinhamento com CEO e Board',
          description: 'Comunicação de estratégia de produto, resultados e riscos para a liderança.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Parceria com Vendas, Marketing e Sucesso',
          description: 'Alinhamento com outras áreas para go-to-market e experiência do cliente.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
