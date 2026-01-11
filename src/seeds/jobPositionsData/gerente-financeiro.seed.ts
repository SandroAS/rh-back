import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Gerente Financeiro',
  cbo_code: '1231-10',
  base_salary: 0,
  description: 'Gestão estratégica das finanças corporativas, planejamento financeiro (FP&A), gestão de tesouraria, relações bancárias, compliance fiscal e suporte à tomada de decisão da diretoria.',
  metrics: [
    {
      name: 'Acuracidade do Budget (Orçado x Realizado)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Planejamento e Controle',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 85 },
        { drd_level_order: 2, min_score: 88 },
        { drd_level_order: 3, min_score: 90 },
        { drd_level_order: 4, min_score: 92 },
        { drd_level_order: 5, min_score: 94 },
        { drd_level_order: 6, min_score: 95 },
        { drd_level_order: 7, min_score: 96 },
        { drd_level_order: 8, min_score: 97 },
        { drd_level_order: 9, min_score: 98 },
      ],
    },
    {
      name: 'Ciclo Financeiro (Dias)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Gestão de Capital de Giro',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 60 },
        { drd_level_order: 2, min_score: 55 },
        { drd_level_order: 3, min_score: 50 },
        { drd_level_order: 4, min_score: 45 },
        { drd_level_order: 5, min_score: 40 },
        { drd_level_order: 6, min_score: 35 },
        { drd_level_order: 7, min_score: 30 },
        { drd_level_order: 8, min_score: 25 },
        { drd_level_order: 9, min_score: 20 },
      ],
    },
  ],
  topics: [
    {
      name: 'Estratégia e Planejamento',
      order: 1,
      drdTopicItems: [
        {
          name: 'Planejamento Financeiro e Orçamentário (FP&A)',
          description: 'Capacidade de elaborar orçamentos anuais, revisões (forecast) e cenários de longo prazo.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Gestão de Tesouraria e Captação',
          description: 'Habilidade em negociar taxas com bancos, gerir aplicações e garantir liquidez imediata.',
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
      name: 'Análise e Tomada de Decisão',
      order: 2,
      drdTopicItems: [
        {
          name: 'Análise de Viabilidade (Capex e Investimentos)',
          description: 'Uso de ferramentas como VPL, TIR e Payback para validar novos projetos e aquisições.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Gestão de Custos e Margens',
          description: 'Identificação de ineficiências operacionais e implementação de planos de redução de despesas.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Liderança e Governança',
      order: 3,
      drdTopicItems: [
        {
          name: 'Desenvolvimento de Equipe Financeira',
          description: 'Capacidade de mentorar assistentes e analistas, promovendo a sucessão e alta performance.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Compliance e Auditoria Interna',
          description: 'Garantia de que todos os processos contábeis e fiscais seguem as normas e evitam riscos jurídicos.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
