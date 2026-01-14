import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Software Engineer',
  cbo_code: '2124-05', // Analista de desenvolvimento de sistemas
  base_salary: 0,
  description: 'Responsável pelo design, desenvolvimento e manutenção de sistemas de software, utilizando boas práticas de engenharia e padrões de arquitetura.',
  metrics: [
    {
      name: 'Taxa de Erros em Produção (CFR)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Qualidade (DORA Metrics)',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 15.0 },
        { drd_level_order: 2, min_score: 12.0 },
        { drd_level_order: 3, min_score: 10.0 },
        { drd_level_order: 4, min_score: 8.0 },
        { drd_level_order: 5, min_score: 5.0 },
        { drd_level_order: 6, min_score: 3.0 },
        { drd_level_order: 7, min_score: 2.0 },
        { drd_level_order: 8, min_score: 1.0 },
        { drd_level_order: 9, min_score: 0.5 },
      ],
    },
    {
      name: 'Lead Time for Changes',
      order: 2,
      type: MetricType.DURATION_HOURS,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Eficiência',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 168 }, // 1 semana
        { drd_level_order: 2, min_score: 120 },
        { drd_level_order: 3, min_score: 72 },  // 3 dias
        { drd_level_order: 4, min_score: 48 },
        { drd_level_order: 5, min_score: 24 },  // 1 dia
        { drd_level_order: 6, min_score: 12 },
        { drd_level_order: 7, min_score: 6 },
        { drd_level_order: 8, min_score: 3 },
        { drd_level_order: 9, min_score: 1 },
      ],
    },
  ],
  topics: [
    {
      name: 'Qualidade e Código Limpo',
      order: 1,
      drdTopicItems: [
        {
          name: 'Clean Code e Refatoração',
          description: 'Aplicação de princípios para escrita de código legível, testável e de fácil manutenção.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 5 })),
        },
        {
          name: 'Testes Automatizados',
          description: 'Criação de testes unitários, de integração e end-to-end para garantir a estabilidade.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Arquitetura e Design',
      order: 2,
      drdTopicItems: [
        {
          name: 'Padrões de Projeto (Design Patterns)',
          description: 'Uso adequado de padrões (SOLID, GoF) para resolver problemas comuns de estrutura.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Arquitetura de Sistemas',
          description: 'Design de sistemas escaláveis (Microserviços, Event-driven, Layered Architecture).',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 5 })),
        }
      ],
    },
    {
      name: 'Conhecimento da Stack',
      order: 3,
      drdTopicItems: [
        {
          name: 'Linguagens e Frameworks',
          description: 'Proficiência técnica nas linguagens core da empresa e seus ecossistemas.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Banco de Dados',
          description: 'Modelagem, otimização de queries e conhecimento em bancos SQL e NoSQL.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Soft Skills e Liderança Técnica',
      order: 4,
      drdTopicItems: [
        {
          name: 'Code Review',
          description: 'Capacidade de revisar código de pares provendo feedback construtivo e técnico.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Mentoria e Documentação',
          description: 'Auxílio no desenvolvimento de desenvolvedores menos experientes e registro técnico.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 2 : 5 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
