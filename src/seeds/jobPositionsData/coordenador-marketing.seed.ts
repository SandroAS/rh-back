import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Coordenador de Marketing',
  cbo_code: '1233-05',
  base_salary: 0,
  description: 'Coordenação da equipe, gestão de orçamento, planejamento estratégico da marca e alinhamento do marketing com os objetivos de receita da empresa.',
  metrics: [
    {
      name: 'Redução de CAC (Customer Acquisition Cost)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência Financeira',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 2 },
        { drd_level_order: 2, min_score: 4 },
        { drd_level_order: 3, min_score: 6 },
        { drd_level_order: 4, min_score: 8 },
        { drd_level_order: 5, min_score: 10 },
        { drd_level_order: 6, min_score: 12 },
        { drd_level_order: 7, min_score: 15 },
        { drd_level_order: 8, min_score: 18 },
        { drd_level_order: 9, min_score: 20 },
      ],
    },
    {
      name: 'Participação no Pipeline (Marketing Sourced Revenue)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Impacto em Vendas',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 15 },
        { drd_level_order: 2, min_score: 20 },
        { drd_level_order: 3, min_score: 25 },
        { drd_level_order: 4, min_score: 30 },
        { drd_level_order: 5, min_score: 35 },
        { drd_level_order: 6, min_score: 40 },
        { drd_level_order: 7, min_score: 45 },
        { drd_level_order: 8, min_score: 50 },
        { drd_level_order: 9, min_score: 60 },
      ],
    },
  ],
  topics: [
    {
      name: 'Gestão de Equipe e Liderança',
      order: 1,
      drdTopicItems: [
        {
          name: 'Desenvolvimento de Talentos e Gestão de OKRs',
          description: 'Capacidade de liderar o time, definir metas claras e realizar mentorias para evolução técnica da equipe.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Gestão de Fornecedores e Agências',
          description: 'Habilidade em coordenar parceiros externos, garantindo prazos, qualidade e ROI das entregas terceirizadas.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Planejamento Estratégico e Orçamento',
      order: 2,
      drdTopicItems: [
        {
          name: 'Gestão de Budget e Alocação de Recursos',
          description: 'Planejamento financeiro da área, garantindo que o orçamento seja distribuído de forma eficiente entre canais.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Branding e Posicionamento de Mercado',
          description: 'Zelar pela consistência da marca e definir como a empresa deve ser percebida perante a concorrência.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Análise Macro e Relacionamento',
      order: 3,
      drdTopicItems: [
        {
          name: 'Alinhamento Marketing e Vendas (Smarketing)',
          description: 'Colaboração direta com o time comercial para garantir que os leads gerados estão convertendo em negócios.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
