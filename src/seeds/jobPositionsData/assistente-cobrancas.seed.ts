import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Assistente de Cobranças',
  cbo_code: '4110-30',
  base_salary: 0,
  description: 'Atua na recuperação de crédito, monitoramento de contas a receber, negociação de débitos pendentes e execução de réguas de cobrança ativa e receptiva.',
  metrics: [
    {
      name: 'Índice de Recuperação de Crédito (Target Mensal)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Efetividade',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 70 },
        { drd_level_order: 2, min_score: 75 },
        { drd_level_order: 3, min_score: 80 },
        { drd_level_order: 4, min_score: 83 },
        { drd_level_order: 5, min_score: 85 },
        { drd_level_order: 6, min_score: 88 },
        { drd_level_order: 7, min_score: 90 },
        { drd_level_order: 8, min_score: 92 },
        { drd_level_order: 9, min_score: 95 },
      ],
    },
    {
      name: 'Promessas de Pagamento Cumpridas (PPC)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade da Negociação',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 60 },
        { drd_level_order: 2, min_score: 65 },
        { drd_level_order: 3, min_score: 70 },
        { drd_level_order: 4, min_score: 75 },
        { drd_level_order: 5, min_score: 80 },
        { drd_level_order: 6, min_score: 82 },
        { drd_level_order: 7, min_score: 85 },
        { drd_level_order: 8, min_score: 88 },
        { drd_level_order: 9, min_score: 90 },
      ],
    },
  ],
  topics: [
    {
      name: 'Execução e Processos',
      order: 1,
      drdTopicItems: [
        {
          name: 'Domínio da Régua de Cobrança',
          description: 'Conhecimento dos prazos e canais (e-mail, SMS, telefone) para cada estágio da inadimplência.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Agilidade no Registro de Ocorrências',
          description: 'Qualidade e rapidez no preenchimento do histórico de negociação no CRM/ERP.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Negociação e Comunicação',
      order: 2,
      drdTopicItems: [
        {
          name: 'Técnicas de Argumentação e Persuasão',
          description: 'Habilidade em contornar objeções e propor soluções de parcelamento viáveis.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Equilíbrio Emocional e Empatia',
          description: 'Capacidade de lidar com clientes agressivos ou situações sociais complexas sem perder o profissionalismo.',
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
      name: 'Conformidade e Legislação',
      order: 3,
      drdTopicItems: [
        {
          name: 'Conhecimento do Código de Defesa do Consumidor',
          description: 'Respeito aos limites legais de cobrança, evitando exposição ao ridículo ou coação.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
