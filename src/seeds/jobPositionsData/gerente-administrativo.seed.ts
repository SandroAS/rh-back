import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Gerente Administrativo',
  cbo_code: '1210-05',
  base_salary: 0,
  description: 'Planeja, organiza e controla as atividades de áreas administrativas, definindo estratégias para otimização de infraestrutura, recursos financeiros e processos internos.',
  metrics: [
    {
      name: 'Aderência ao Orçamento (OPEX)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Gestão Financeira',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 85.0 },
        { drd_level_order: 2, min_score: 88.0 },
        { drd_level_order: 3, min_score: 90.0 },
        { drd_level_order: 4, min_score: 92.0 },
        { drd_level_order: 5, min_score: 94.0 },
        { drd_level_order: 6, min_score: 95.5 },
        { drd_level_order: 7, min_score: 97.0 },
        { drd_level_order: 8, min_score: 98.5 },
        { drd_level_order: 9, min_score: 99.5 },
      ],
    },
    {
      name: 'NPS Interno (Satisfação de Clientes Internos)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade de Serviço',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 70.0 },
        { drd_level_order: 2, min_score: 75.0 },
        { drd_level_order: 3, min_score: 78.0 },
        { drd_level_order: 4, min_score: 82.0 },
        { drd_level_order: 5, min_score: 85.0 },
        { drd_level_order: 6, min_score: 88.0 },
        { drd_level_order: 7, min_score: 90.0 },
        { drd_level_order: 8, min_score: 92.0 },
        { drd_level_order: 9, min_score: 95.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Segurança Operacional e Confiabilidade',
      order: 1,
      drdTopicItems: [
        {
          name: 'Continuidade de Negócio',
          description: 'Garantir que a infraestrutura e os serviços administrativos suportem a operação sem interrupções.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Gestão de Riscos Administrativos',
          description: 'Identificar e mitigar riscos em contratos, facilities e processos burocráticos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Reputação e Posicionamento de Mercado',
      order: 2,
      drdTopicItems: [
        {
          name: 'Gestão de Terceiros e Fornecedores',
          description: 'Garantir que parceiros e fornecedores entreguem serviços que mantenham o padrão de excelência da empresa.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Sustentabilidade Corporativa',
          description: 'Liderar iniciativas de governança e práticas sustentáveis no uso de recursos da companhia.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        }
      ],
    },
    {
      name: 'Cultura Organizacional Forte e Engajamento',
      order: 3,
      drdTopicItems: [
        {
          name: 'Liderança e Desenvolvimento',
          description: 'Desenvolver as competências técnicas e comportamentais da equipe administrativa.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Clima Organizacional',
          description: 'Promover um ambiente de trabalho saudável, inclusivo e focado em resultados.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Eficiência Operacional e Escalabilidade',
      order: 4,
      drdTopicItems: [
        {
          name: 'Transformação Digital Adm',
          description: 'Implementar tecnologias que permitam a escalabilidade dos processos administrativos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Redução de Desperdícios',
          description: 'Otimizar o uso de ativos e insumos, buscando a máxima eficiência financeira.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Crescimento Sustentável',
      order: 5,
      drdTopicItems: [
        {
          name: 'Planejamento Estratégico',
          description: 'Alinhar as metas administrativas ao planejamento de longo prazo da organização.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Compliance e Auditoria',
          description: 'Assegurar que todos os processos administrativos estejam em conformidade com leis e normas vigentes.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Inovação no Desenvolvimento de Produtos',
      order: 6,
      drdTopicItems: [
        {
          name: 'Facilitação de Inovação',
          description: 'Prover infraestrutura e recursos que permitam às outras áreas inovar com agilidade.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 2 : 4 })),
        },
        {
          name: 'Processos Ágeis na Gestão',
          description: 'Adaptar metodologias ágeis para a gestão de projetos administrativos e infraestrutura.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
