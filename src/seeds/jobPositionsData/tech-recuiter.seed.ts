import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';

export default {
  title: 'Tech Recuiter',
  cbo_code: '2524-05',
  base_salary: 0,
  description: 'Especialista em recrutamento e seleção para perfis técnicos.',
  metrics: [
    {
      name: 'Tempo de Fechamento (SLA)',
      order: 1,
      type: MetricType.DURATION_DAYS,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Tempo de Fechamento (SLA)',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 30 },
        { drd_level_order: 2, min_score: 20 },
        { drd_level_order: 3, min_score: 15 },
      ],
    },
  ],
  topics: [
    {
      name: 'Competências Técnicas',
      order: 1,
      drdTopicItems: [
        {
          name: 'Sourcing (Busca Ativa)',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 },
            { drd_level_order: 2, min_score: 4 },
            { drd_level_order: 3, min_score: 5 },
          ],
        },
        {
          name: 'Entrevista Técnica',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 },
            { drd_level_order: 2, min_score: 4 },
            { drd_level_order: 3, min_score: 5 },
          ],
        },
      ],
    },
  ],
};
