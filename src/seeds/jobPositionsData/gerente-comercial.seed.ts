import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Gerente Comercial',
  cbo_code: '1423-20',
  base_salary: 0,
  description: 'Responsável pela estratégia comercial da unidade ou região: definição de metas, gestão de supervisores e equipes de vendas, relacionamento com grandes contas e alinhamento com a diretoria.',
  metrics: [
    {
      name: 'Percentual da Equipe que Bateu Meta',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Gestão de Talentos',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 60 }, { drd_level_order: 2, min_score: 65 }, { drd_level_order: 3, min_score: 70 },
        { drd_level_order: 4, min_score: 75 }, { drd_level_order: 5, min_score: 80 }, { drd_level_order: 6, min_score: 85 },
        { drd_level_order: 7, min_score: 88 }, { drd_level_order: 8, min_score: 90 }, { drd_level_order: 9, min_score: 92 },
      ],
    },
    {
      name: 'ROI do Canal de Vendas',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência Financeira',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 3.0 }, { drd_level_order: 2, min_score: 3.5 }, { drd_level_order: 3, min_score: 4.0 },
        { drd_level_order: 4, min_score: 4.5 }, { drd_level_order: 5, min_score: 5.0 }, { drd_level_order: 6, min_score: 5.5 },
        { drd_level_order: 7, min_score: 6.0 }, { drd_level_order: 8, min_score: 6.5 }, { drd_level_order: 9, min_score: 7.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Estratégia e Liderança Comercial',
      order: 1,
      drdTopicItems: [
        {
          name: 'Estratégia de Vendas e Alinhamento ao Negócio',
          description: 'Definição de metas por região/produto, previsão de receita e comunicação com a diretoria e outras áreas.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Gestão de Supervisores e Equipes de Vendas',
          description: 'Liderança de supervisores, definição de KPIs, acompanhamento de forecast e desenvolvimento de talentos.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
