import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Lead Software Engineer',
  cbo_code: '2124-05',
  base_salary: 0,
  description: 'Líder técnico responsável por definir a visão tecnológica, garantir a excelência na engenharia de software e mentorar engenheiros seniores e plenos.',
  metrics: [
    {
      name: 'MTTR (Mean Time to Recovery)',
      order: 1,
      type: MetricType.DURATION_HOURS,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Resiliência Organizacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 24.0 },
        { drd_level_order: 2, min_score: 12.0 },
        { drd_level_order: 3, min_score: 8.0 },
        { drd_level_order: 4, min_score: 4.0 },
        { drd_level_order: 5, min_score: 2.0 },
        { drd_level_order: 6, min_score: 1.0 },
        { drd_level_order: 7, min_score: 0.5 },
        { drd_level_order: 8, min_score: 0.25 },
        { drd_level_order: 9, min_score: 0.1 },
      ],
    },
    {
      name: 'Health Score dos Projetos',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade Estratégica',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 70.0 },
        { drd_level_order: 2, min_score: 75.0 },
        { drd_level_order: 3, min_score: 80.0 },
        { drd_level_order: 4, min_score: 85.0 },
        { drd_level_order: 5, min_score: 90.0 },
        { drd_level_order: 6, min_score: 92.0 },
        { drd_level_order: 7, min_score: 95.0 },
        { drd_level_order: 8, min_score: 98.0 },
        { drd_level_order: 9, min_score: 100.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Visão Técnica e Estratégia',
      order: 1,
      drdTopicItems: [
        {
          name: 'Arquitetura Corporativa',
          description: 'Definição de padrões de arquitetura que escalam para além de um único serviço ou time.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        },
        {
          name: 'Inovação e Pesquisa (R&D)',
          description: 'Identificação e avaliação de novas tecnologias para resolver problemas de negócio complexos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 4 })),
        }
      ],
    },
    {
      name: 'Influência e Liderança',
      order: 2,
      drdTopicItems: [
        {
          name: 'Mentoria de Carreira Técnica',
          description: 'Apoio direto no crescimento técnico de engenheiros seniores e preparação de sucessores.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Comunicação com Stakeholders',
          description: 'Tradução de desafios técnicos complexos em termos de impacto de negócio para liderança executiva.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 3 : 5 })),
        }
      ],
    },
    {
      name: 'Excelência Operacional',
      order: 3,
      drdTopicItems: [
        {
          name: 'Governança de Engenharia',
          description: 'Criação e manutenção de guias de estilo, padrões de segurança e processos de CI/CD corporativos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Resolução de Incidentes Críticos',
          description: 'Liderança em momentos de crise e condução de Post-Mortems para evitar recorrências.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
