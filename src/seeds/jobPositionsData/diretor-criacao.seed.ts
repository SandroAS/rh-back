import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Diretor de Criação',
  cbo_code: '1233-10',
  base_salary: 0,
  description: 'Liderança da visão criativa da marca, gestão de diretores de arte e redatores, e garantia da unidade estética e conceitual de todas as campanhas.',
  metrics: [
    {
      name: 'Brand Awareness / Share of Voice',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Força de Marca',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5 },
        { drd_level_order: 2, min_score: 8 },
        { drd_level_order: 3, min_score: 12 },
        { drd_level_order: 4, min_score: 15 },
        { drd_level_order: 5, min_score: 20 },
        { drd_level_order: 6, min_score: 25 },
        { drd_level_order: 7, min_score: 30 },
        { drd_level_order: 8, min_score: 35 },
        { drd_level_order: 9, min_score: 45 },
      ],
    },
    {
      name: 'Taxa de Aprovação de Conceito (First Round)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência Criativa',
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
  ],
  topics: [
    {
      name: 'Responsabilidades Organizacionais',
      order: 1,
      drdTopicItems: [
        {
          name: 'Gestão de Talentos e Retenção',
          description: 'Identificação de talentos, recrutamento e esforços para manter os melhores criativos na casa.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Cultura Criativa e Ambiente de Trabalho',
          description: 'Fomentar um ambiente que estimule a inovação, a colaboração e a segurança psicológica.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Visão de Negócio e ROI Criativo',
          description: 'Alinhamento dos processos criativos com a saúde financeira e lucratividade da operação.',
          order: 3,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Liderança e Mentoria Criativa',
      order: 2,
      drdTopicItems: [
        {
          name: 'Desenvolvimento de Diretores de Arte e Redatores',
          description: 'Capacidade de elevar o nível técnico e criativo da equipe através de feedbacks construtivos e referências.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Direção de Arte e Unidade Visual',
          description: 'Garantir que todas as peças sigam o guia de marca e mantenham consistência em múltiplos canais.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Visão Estratégica e Conceituação',
      order: 3,
      drdTopicItems: [
        {
          name: 'Criação de Big Ideas e Campanhas Integradas',
          description: 'Tradução de briefings de negócios em conceitos criativos potentes e desdobráveis.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    }
  ],
} as JobPositionDefinition;
