import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'DevOps Engineer',
  cbo_code: '2124-05', // Analista de rede e de comunicação de dados
  base_salary: 0,
  description: 'Focado em infraestrutura como código (IaC), automação de pipelines CI/CD, monitoramento e garantia da disponibilidade e escalabilidade dos serviços.',
  metrics: [
    {
      name: 'Disponibilidade dos Serviços (Uptime)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Confiabilidade (SRE)',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 95.0 },
        { drd_level_order: 2, min_score: 98.0 },
        { drd_level_order: 3, min_score: 99.0 },
        { drd_level_order: 4, min_score: 99.5 },
        { drd_level_order: 5, min_score: 99.9 },
        { drd_level_order: 6, min_score: 99.95 },
        { drd_level_order: 7, min_score: 99.99 },
        { drd_level_order: 8, min_score: 99.995 },
        { drd_level_order: 9, min_score: 99.999 },
      ],
    },
    {
      name: 'Deployment Frequency (Frequência de Deploy)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Velocidade (DORA Metrics)',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 1 }, // Mensal
        { drd_level_order: 2, min_score: 2 }, 
        { drd_level_order: 3, min_score: 4 }, // Semanal
        { drd_level_order: 4, min_score: 8 },
        { drd_level_order: 5, min_score: 15 }, // Diário
        { drd_level_order: 6, min_score: 30 },
        { drd_level_order: 7, min_score: 60 },
        { drd_level_order: 8, min_score: 100 },
        { drd_level_order: 9, min_score: 200 },
      ],
    },
  ],
  topics: [
    {
      name: 'Infraestrutura como Código (IaC)',
      order: 1,
      drdTopicItems: [
        {
          name: 'Domínio de Terraform/CloudFormation',
          description: 'Habilidade em provisionar recursos em nuvem de forma declarativa e versionada.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 5 })),
        },
        {
          name: 'Gerenciamento de Configuração',
          description: 'Uso de ferramentas como Ansible, Puppet ou Chef para padronização de ambientes.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'CI/CD e Automação',
      order: 2,
      drdTopicItems: [
        {
          name: 'Construção de Pipelines',
          description: 'Criação de esteiras de integração e entrega contínua (GitHub Actions, GitLab CI, Jenkins).',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Estratégias de Deploy',
          description: 'Implementação de Blue-Green, Canary ou Rolling updates para reduzir downtime.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 5 })),
        }
      ],
    },
    {
      name: 'Observabilidade e Monitoramento',
      order: 3,
      drdTopicItems: [
        {
          name: 'Logs e Métricas',
          description: 'Configuração de stack de monitoramento (Prometheus, Grafana, ELK) e alertas inteligentes.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Tracing e APM',
          description: 'Capacidade de rastrear requisições e identificar gargalos de performance em microserviços.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 5 })),
        }
      ],
    },
    {
      name: 'Segurança e Cloud',
      order: 4,
      drdTopicItems: [
        {
          name: 'DevSecOps',
          description: 'Integração de testes de segurança (SAST/DAST) e análise de vulnerabilidades no pipeline.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 3 })),
        },
        {
          name: 'Gestão de Custos (FinOps)',
          description: 'Análise e otimização de gastos em nuvem, garantindo eficiência financeira.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 2 : 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
