import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Secretário Executivo',
  cbo_code: '2523-05',
  base_salary: 0,
  description: 'Presta assistência direta à diretoria, gerenciando agendas, viagens, redação de documentos oficiais e organização de reuniões estratégicas.',
  metrics: [
    {
      name: 'Nível de Satisfação da Diretoria (NPS Interno)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade de Suporte',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 85.0 },
        { drd_level_order: 2, min_score: 87.0 },
        { drd_level_order: 3, min_score: 90.0 },
        { drd_level_order: 4, min_score: 92.0 },
        { drd_level_order: 5, min_score: 94.0 },
        { drd_level_order: 6, min_score: 95.0 },
        { drd_level_order: 7, min_score: 96.0 },
        { drd_level_order: 8, min_score: 98.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
    {
      name: 'Eficiência na Gestão de Agendas (Conflitos Zero)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Gestão de Tempo',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 90.0 },
        { drd_level_order: 2, min_score: 92.0 },
        { drd_level_order: 3, min_score: 94.0 },
        { drd_level_order: 4, min_score: 95.0 },
        { drd_level_order: 5, min_score: 96.0 },
        { drd_level_order: 6, min_score: 97.0 },
        { drd_level_order: 7, min_score: 98.0 },
        { drd_level_order: 8, min_score: 99.0 },
        { drd_level_order: 9, min_score: 100.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Competências Técnicas e Redação',
      order: 1,
      drdTopicItems: [
        {
          name: 'Redação Empresarial e Protocolo',
          description: 'Capacidade de redigir atas, e-mails e relatórios com excelência gramatical e formalidade adequada.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Domínio de Ferramentas de Produtividade',
          description: 'Uso avançado de suítes de escritório (Office/Google Workspace) e ferramentas de gestão de agenda.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Confidencialidade e Postura',
      order: 2,
      drdTopicItems: [
        {
          name: 'Ética e Sigilo de Informações',
          description: 'Tratamento de dados sensíveis e decisões de diretoria com total discrição e ética profissional.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Inteligência Emocional e Resiliência',
          description: 'Habilidade de lidar com pressões constantes e gerenciar crises ou imprevistos de forma calma.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Comunicação e Networking Interno',
      order: 3,
      drdTopicItems: [
        {
          name: 'Filtro e Triagem de Demandas',
          description: 'Habilidade em priorizar contatos e assuntos, protegendo o tempo produtivo dos gestores.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Idiomas Estrangeiros',
          description: 'Capacidade de comunicação em inglês ou outro idioma para atendimento a clientes/parceiros globais.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 0 : 4 })),
        }
      ],
    },
    {
      name: 'Organização de Eventos e Logística',
      order: 4,
      drdTopicItems: [
        {
          name: 'Planejamento de Viagens e Eventos',
          description: 'Organização logística impecável de deslocamentos, hospedagens e coffee breaks.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Gestão de Arquivos e Documentação',
          description: 'Manutenção organizada de contratos e documentos físicos/digitais para fácil recuperação.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
