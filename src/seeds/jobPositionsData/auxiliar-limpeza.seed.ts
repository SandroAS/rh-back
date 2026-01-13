import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Auxiliar de Limpeza',
  cbo_code: '5143-20',
  base_salary: 0,
  description: 'Executa a limpeza e conservação de ambientes internos e externos, garantindo a higienização de mobiliários, pisos, janelas e instalações sanitárias.',
  metrics: [
    {
      name: 'Índice de Qualidade da Limpeza (Checklist)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 80.0 },
        { drd_level_order: 2, min_score: 85.0 },
        { drd_level_order: 3, min_score: 88.0 },
        { drd_level_order: 4, min_score: 90.0 },
        { drd_level_order: 5, min_score: 92.0 },
        { drd_level_order: 6, min_score: 94.0 },
        { drd_level_order: 7, min_score: 96.0 },
        { drd_level_order: 8, min_score: 98.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
    {
      name: 'Uso de Insumos (Otimização)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência de Custos',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 85.0 },
        { drd_level_order: 2, min_score: 87.0 },
        { drd_level_order: 3, min_score: 90.0 },
        { drd_level_order: 4, min_score: 92.0 },
        { drd_level_order: 5, min_score: 94.0 },
        { drd_level_order: 6, min_score: 95.0 },
        { drd_level_order: 7, min_score: 97.0 },
        { drd_level_order: 8, min_score: 98.0 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Segurança Operacional e Confiabilidade',
      order: 1,
      drdTopicItems: [
        {
          name: 'Uso de EPIs e Segurança',
          description: 'Cumprimento rigoroso das normas de segurança e uso correto de equipamentos de proteção individual.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Manuseio de Produtos Químicos',
          description: 'Conhecimento sobre diluição, aplicação e riscos de produtos de limpeza.',
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
          name: 'Apresentação e Organização',
          description: 'Manutenção da imagem profissional e organização dos carrinhos e depósitos de material.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Zelo pelo Patrimônio',
          description: 'Cuidado com móveis, equipamentos e infraestrutura da empresa durante a limpeza.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
    {
      name: 'Cultura Organizacional Forte e Engajamento',
      order: 3,
      drdTopicItems: [
        {
          name: 'Colaboração com a Equipe',
          description: 'Ajuda mútua entre os membros da equipe para garantir que todos os setores estejam limpos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Pontualidade e Assiduidade',
          description: 'Comprometimento com os horários de cronograma de limpeza estabelecidos.',
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
          name: 'Produtividade por Setor',
          description: 'Capacidade de cumprir o cronograma de limpeza dentro do tempo estipulado.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Sugestão de Melhorias',
          description: 'Identificação de formas mais eficientes de limpar áreas específicas ou economizar recursos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
