import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Software Architect',
  cbo_code: '2124-05',
  base_salary: 0,
  description: 'Responsável pelo desenho e evolução da arquitetura de sistemas, garantindo escalabilidade, resiliência, segurança e alinhamento tecnológico com as necessidades de negócio.',
  metrics: [
    {
      name: 'Disponibilidade do Sistema (Uptime)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Resiliência',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 99.0 },
        { drd_level_order: 2, min_score: 99.5 },
        { drd_level_order: 3, min_score: 99.7 },
        { drd_level_order: 4, min_score: 99.9 },
        { drd_level_order: 5, min_score: 99.95 },
        { drd_level_order: 6, min_score: 99.99 },
        { drd_level_order: 7, min_score: 99.995 },
        { drd_level_order: 8, min_score: 99.999 },
        { drd_level_order: 9, min_score: 99.9999 },
      ],
    },
    {
      name: 'Redução de Débito Técnico',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Manutenibilidade',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 10.0 },
        { drd_level_order: 2, min_score: 15.0 },
        { drd_level_order: 3, min_score: 20.0 },
        { drd_level_order: 4, min_score: 25.0 },
        { drd_level_order: 5, min_score: 30.0 },
        { drd_level_order: 6, min_score: 40.0 },
        { drd_level_order: 7, min_score: 50.0 },
        { drd_level_order: 8, min_score: 60.0 },
        { drd_level_order: 9, min_score: 75.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Padrões e Design de Sistemas',
      order: 1,
      drdTopicItems: [
        {
          name: 'Arquitetura de Microsserviços e Event-Driven',
          description: 'Desenho de sistemas distribuídos, mensageria (Kafka/RabbitMQ) e padrões de consistência eventual.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 5 })),
        },
        {
          name: 'Cloud Native e Infraestrutura como Código',
          description: 'Conhecimento em provedores de nuvem (AWS/Azure/GCP), Kubernetes e automação de infraestrutura.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 5 })),
        }
      ],
    },
    {
      name: 'Governança e Qualidade',
      order: 2,
      drdTopicItems: [
        {
          name: 'Segurança por Design (Security by Design)',
          description: 'Implementação de protocolos de segurança, criptografia, OAuth2 e mitigação de vulnerabilidades sistêmicas.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Definição de ADRs (Architecture Decision Records)',
          description: 'Capacidade de documentar e comunicar decisões arquiteturais e seus respectivos trade-offs para os times.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        }
      ],
    },
    {
      name: 'Liderança e Visão Técnica',
      order: 3,
      drdTopicItems: [
        {
          name: 'Mentoria de Líderes Técnicos',
          description: 'Apoio aos Tech Leads na resolução de problemas complexos e na disseminação de boas práticas.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 2 : 5 })),
        },
        {
          name: 'Avaliação de Novas Tecnologias (R&D)',
          description: 'Pesquisa e validação de ferramentas, frameworks e linguagens que possam trazer vantagem competitiva.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
