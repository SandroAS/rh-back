import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Suporte Técnico',
  cbo_code: '3172-10',
  base_salary: 0,
  description: 'Suporte de TI interno, manutenção de hardware, software e infraestrutura local com foco em experiência do usuário e segurança.',
  metrics: [
    {
      name: 'Taxa de Resolução no Primeiro Contato (FCR)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência Técnica',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 60.0 },
        { drd_level_order: 2, min_score: 65.0 },
        { drd_level_order: 3, min_score: 70.0 },
        { drd_level_order: 4, min_score: 75.0 },
        { drd_level_order: 5, min_score: 80.0 },
        { drd_level_order: 6, min_score: 83.0 },
        { drd_level_order: 7, min_score: 86.0 },
        { drd_level_order: 8, min_score: 90.0 },
        { drd_level_order: 9, min_score: 95.0 },
      ],
    },
    {
      name: 'Cumprimento de SLA de Atendimento',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Nível de Serviço',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 85.0 },
        { drd_level_order: 2, min_score: 87.0 },
        { drd_level_order: 3, min_score: 89.0 },
        { drd_level_order: 4, min_score: 91.0 },
        { drd_level_order: 5, min_score: 93.0 },
        { drd_level_order: 6, min_score: 95.0 },
        { drd_level_order: 7, min_score: 97.0 },
        { drd_level_order: 8, min_score: 98.0 },
        { drd_level_order: 9, min_score: 99.5 },
      ],
    },
  ],
  topics: [
    {
      name: 'Segurança Operacional e Confiabilidade',
      order: 1,
      drdTopicItems: [
        {
          name: 'Integridade no Atendimento',
          description: 'Atuar com integridade ética no atendimento de chamados e solicitações de usuários.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 4 : 5 })),
        },
        {
          name: 'Foco no Cliente e Colaboração',
          description: 'Apoiar a equipe na resolução de problemas complexos e contribuir para um ambiente colaborativo em TI.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 2 ? 3 : 4 })),
        },
        {
          name: 'Representação de Valores',
          description: 'Respeitar e representar os valores da empresa em todas as interações com colaboradores e parceiros.',
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
          name: 'Manutenção de Equipamentos',
          description: 'Realizar manutenção preventiva e corretiva de hardware e ativos de TI.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Eficiência no Registro',
          description: 'Monitorar e registrar chamados técnicos com precisão e rapidez para gerar dados confiáveis.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Disponibilidade de Infraestrutura',
          description: 'Garantir o pleno funcionamento da infraestrutura local e apoiar implantação de novos sistemas.',
          order: 3,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 4 : 5 })),
        }
      ],
    },
    {
      name: 'Cultura Organizacional Forte e Engajamento',
      order: 3,
      drdTopicItems: [
        {
          name: 'Aprendizado Contínuo',
          description: 'Buscar constantemente atualização em novas tecnologias e tendências de mercado.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 4 })),
        },
        {
          name: 'Documentação e Processos',
          description: 'Documentar procedimentos técnicos e propor melhorias para reduzir falhas recorrentes.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 3 : 5 })),
        },
        {
          name: 'Apoio a Projetos',
          description: 'Contribuir ativamente em projetos de atualização e expansão da infraestrutura tecnológica.',
          order: 3,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 2 : 4 })),
        }
      ],
    },
    {
      name: 'Eficiência Operacional e Escalabilidade',
      order: 4,
      drdTopicItems: [
        {
          name: 'Experiência do Usuário Interno',
          description: 'Identificar ferramentas e métodos que facilitem o dia a dia operacional dos colaboradores.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 3 : 5 })),
        },
        {
          name: 'Automação e Testes',
          description: 'Apoiar testes de novas soluções e contribuir para a implementação de automações de suporte.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 4 })),
        },
        {
          name: 'Soluções Inovadoras',
          description: 'Sugerir soluções criativas para aumentar a produtividade e escalabilidade do time de TI.',
          order: 3,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 7 ? 2 : 5 })),
        }
      ],
    },
    {
      name: 'Crescimento Sustentável',
      order: 5,
      drdTopicItems: [
        {
          name: 'Segurança da Informação e LGPD',
          description: 'Seguir boas práticas de segurança, monitorar acessos e garantir conformidade com políticas internas e LGPD.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Proteção Ativa',
          description: 'Garantir a atualização constante de antivírus, patches de segurança e backups de usuários.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Plano de Contingência',
          description: 'Atuar prontamente em planos de contingência e recuperação durante incidentes críticos.',
          order: 3,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 4 : 5 })),
        }
      ],
    },
    {
      name: 'Inovação no Desenvolvimento de Produtos',
      order: 6,
      drdTopicItems: [
        {
          name: 'Excelência no Atendimento Técnico',
          description: 'Prestar suporte com cordialidade, foco no sucesso do cliente interno e tempo de resposta ágil.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Imagem e Eficiência do Time',
          description: 'Contribuir para a imagem de alta eficiência do departamento de TI perante a empresa.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 4 : 5 })),
        },
        {
          name: 'Referência em Boas Práticas',
          description: 'Atuar como referência técnica e cultural em boas práticas de suporte para novos membros.',
          order: 3,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 6 ? 3 : 5 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
