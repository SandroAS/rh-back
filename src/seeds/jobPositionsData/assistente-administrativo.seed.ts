import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Assistente Administrativo',
  cbo_code: '4110-10',
  base_salary: 0,
  description: 'Executa atividades de apoio administrativo relacionadas aos processos de gestão, organização de documentos, atendimento e rotinas operacionais.',
  metrics: [
    {
      name: 'Precisão em Lançamentos e Documentos',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 85.0 },
        { drd_level_order: 2, min_score: 88.0 },
        { drd_level_order: 3, min_score: 91.0 },
        { drd_level_order: 4, min_score: 93.0 },
        { drd_level_order: 5, min_score: 95.0 },
        { drd_level_order: 6, min_score: 96.0 },
        { drd_level_order: 7, min_score: 97.5 },
        { drd_level_order: 8, min_score: 98.5 },
        { drd_level_order: 9, min_score: 99.8 },
      ],
    },
    {
      name: 'Cumprimento de Prazos de Rotina',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 80.0 },
        { drd_level_order: 2, min_score: 83.0 },
        { drd_level_order: 3, min_score: 86.0 },
        { drd_level_order: 4, min_score: 90.0 },
        { drd_level_order: 5, min_score: 92.0 },
        { drd_level_order: 6, min_score: 94.0 },
        { drd_level_order: 7, min_score: 96.0 },
        { drd_level_order: 8, min_score: 98.0 },
        { drd_level_order: 9, min_score: 100.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Segurança Operacional e Confiabilidade',
      order: 1,
      drdTopicItems: [
        {
          name: 'Integridade Administrativa',
          description: 'Atuar com integridade no manuseio de informações confidenciais e documentos da empresa.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Confiabilidade de Dados',
          description: 'Garantir que os registros administrativos sejam precisos e reflitam a realidade operacional.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Apoio Ético à Gestão',
          description: 'Representar os valores da empresa em comunicações internas e externas.',
          order: 3,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Reputação e Posicionamento de Mercado',
      order: 2,
      drdTopicItems: [
        {
          name: 'Organização de Fluxos',
          description: 'Manter fluxos de trabalho administrativos organizados para agilizar o atendimento a parceiros e clientes.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 4 })),
        },
        {
          name: 'Qualidade no Atendimento',
          description: 'Monitorar solicitações pendentes e garantir que a reputação de agilidade do setor seja mantida.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Cultura Organizacional Forte e Engajamento',
      order: 3,
      drdTopicItems: [
        {
          name: 'Colaboração Interdepartamental',
          description: 'Contribuir para um ambiente colaborativo, apoiando outras áreas em demandas burocráticas.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Atualização de Conhecimentos',
          description: 'Buscar aprendizado em novas ferramentas de produtividade e softwares de gestão (ERP).',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 4 })),
        }
      ],
    },
    {
      name: 'Eficiência Operacional e Escalabilidade',
      order: 4,
      drdTopicItems: [
        {
          name: 'Otimização de Processos',
          description: 'Propor melhorias em processos repetitivos para reduzir o tempo de execução e erros.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        },
        {
          name: 'Apoio à Automação',
          description: 'Identificar tarefas que podem ser automatizadas via planilhas ou ferramentas de Workflow.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 4 })),
        }
      ],
    },
    {
      name: 'Crescimento Sustentável',
      order: 5,
      drdTopicItems: [
        {
          name: 'Conformidade e LGPD',
          description: 'Monitorar o tratamento de dados pessoais em documentos físicos e digitais seguindo a LGPD.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Gestão de Recursos',
          description: 'Apoiar o controle de custos e suprimentos para garantir o uso sustentável dos recursos da empresa.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 3 : 4 })),
        }
      ],
    },
    {
      name: 'Inovação no Desenvolvimento de Produtos',
      order: 6,
      drdTopicItems: [
        {
          name: 'Suporte à Inovação',
          description: 'Apoiar testes de novos processos internos e softwares de gestão.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 7 ? 2 : 4 })),
        },
        {
          name: 'Excelência em Suporte Interno',
          description: 'Atuar como referência de cordialidade e eficiência na resolução de trâmites administrativos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
