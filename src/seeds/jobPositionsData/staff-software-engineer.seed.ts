import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Staff Software Engineer',
  cbo_code: '2124-05',
  base_salary: 0,
  description:
    'Engenheiro de software sênior com impacto além do squad: define padrões técnicos, influencia múltiplos times e resolve os problemas mais complexos da organização.',
  metrics: [
    {
      name: 'Taxa de Erros em Produção (CFR)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Qualidade (DORA Metrics)',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 8.0 },
        { drd_level_order: 2, min_score: 5.0 },
        { drd_level_order: 3, min_score: 3.0 },
        { drd_level_order: 4, min_score: 2.0 },
        { drd_level_order: 5, min_score: 1.0 },
        { drd_level_order: 6, min_score: 0.5 },
        { drd_level_order: 7, min_score: 0.3 },
        { drd_level_order: 8, min_score: 0.2 },
        { drd_level_order: 9, min_score: 0.1 },
      ],
    },
    {
      name: 'Impacto em Múltiplos Times/Sistemas',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Alcance',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 1 },
        { drd_level_order: 2, min_score: 2 },
        { drd_level_order: 3, min_score: 3 },
        { drd_level_order: 4, min_score: 4 },
        { drd_level_order: 5, min_score: 5 },
        { drd_level_order: 6, min_score: 6 },
        { drd_level_order: 7, min_score: 7 },
        { drd_level_order: 8, min_score: 8 },
        { drd_level_order: 9, min_score: 10 },
      ],
    },
  ],
  topics: [
    {
      name: 'Arquitetura e Design de Alto Impacto',
      order: 1,
      drdTopicItems: [
        {
          name: 'Arquitetura de Domínio/Organização',
          description: 'Desenho de soluções que impactam múltiplos squads ou toda a organização.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: Math.min(5, 2 + Math.floor(i / 2)) })),
        },
        {
          name: 'Padrões e Governança Técnica',
          description: 'Definição e disseminação de padrões técnicos adotados por vários times.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
      ],
    },
    {
      name: 'Liderança Técnica sem Gestão',
      order: 2,
      drdTopicItems: [
        {
          name: 'Mentoria de Tech Leads e Seniores',
          description: 'Desenvolvimento de outros líderes técnicos e engenheiros sêniores.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Resolução de Problemas Ambíguos',
          description: 'Capacidade de quebrar problemas complexos e multi-dimensionais em entregas claras.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
      ],
    },
    {
      name: 'Conhecimento Profundo e Breadth',
      order: 3,
      drdTopicItems: [
        {
          name: 'Expertise em Stack e Ecossistema',
          description: 'Referência técnica em linguagens, frameworks e infraestrutura usados pela empresa.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Cross-Functional Influence',
          description: 'Colaboração com Product, Design e negócio para decisões técnicas alinhadas ao valor.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        },
      ],
    },
  ],
} as JobPositionDefinition;
