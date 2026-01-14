import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Developer',
  cbo_code: '2124-05',
  base_salary: 0,
  description: 'Responsável pelo ciclo de vida de desenvolvimento de software, desde a análise de requisitos e codificação até a implementação, manutenção e otimização de sistemas e aplicações.',
  metrics: [
    {
      name: 'Cobertura de Testes Automatizados',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 40.0 },
        { drd_level_order: 2, min_score: 50.0 },
        { drd_level_order: 3, min_score: 60.0 },
        { drd_level_order: 4, min_score: 70.0 },
        { drd_level_order: 5, min_score: 75.0 },
        { drd_level_order: 6, min_score: 80.0 },
        { drd_level_order: 7, min_score: 85.0 },
        { drd_level_order: 8, min_score: 90.0 },
        { drd_level_order: 9, min_score: 95.0 },
      ],
    },
    {
      name: 'Cycle Time (Média de dias para concluir uma Task)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Produtividade',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 10.0 },
        { drd_level_order: 2, min_score: 8.0 },
        { drd_level_order: 3, min_score: 6.0 },
        { drd_level_order: 4, min_score: 5.0 },
        { drd_level_order: 5, min_score: 4.0 },
        { drd_level_order: 6, min_score: 3.5 },
        { drd_level_order: 7, min_score: 3.0 },
        { drd_level_order: 8, min_score: 2.5 },
        { drd_level_order: 9, min_score: 2.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Excelência Técnica e Código',
      order: 1,
      drdTopicItems: [
        {
          name: 'Qualidade de Código e Clean Code',
          description: 'Aplicação de boas práticas, legibilidade, extensibilidade e padrões de projeto (Design Patterns).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 5 })),
        },
        {
          name: 'Resolução de Problemas Complexos',
          description: 'Capacidade de identificar a causa raiz de bugs críticos e propor soluções de arquitetura escaláveis.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 5 })),
        }
      ],
    },
    {
      name: 'Arquitetura e DevOps',
      order: 2,
      drdTopicItems: [
        {
          name: 'Conhecimento de Infraestrutura e CI/CD',
          description: 'Entendimento de pipelines de deploy, containerização (Docker/K8s) e monitoramento de aplicações.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 2 : 4 })),
        },
        {
          name: 'Arquitetura de Sistemas',
          description: 'Definição de modelos de dados, integração de APIs e escolha de tecnologias apropriadas para o projeto.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 5 })),
        }
      ],
    },
    {
      name: 'Cultura e Colaboração',
      order: 3,
      drdTopicItems: [
        {
          name: 'Revisão de Código (Code Review)',
          description: 'Capacidade de realizar revisões construtivas que garantam a qualidade e compartilhem conhecimento com o time.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Documentação Técnica',
          description: 'Criação e manutenção de documentação clara para APIs, processos internos e arquitetura do sistema.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 3 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
