import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Analista de Processos',
  cbo_code: '2521-05',
  base_salary: 0,
  description: 'Especialista responsável pelo mapeamento, análise, redesenho e implementação de melhorias nos processos organizacionais, visando o aumento da produtividade e a redução de custos e falhas.',
  metrics: [
    {
      name: 'Redução de Lead Time de Processos',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5.0 },
        { drd_level_order: 2, min_score: 7.0 },
        { drd_level_order: 3, min_score: 10.0 },
        { drd_level_order: 4, min_score: 12.0 },
        { drd_level_order: 5, min_score: 15.0 },
        { drd_level_order: 6, min_score: 18.0 },
        { drd_level_order: 7, min_score: 20.0 },
        { drd_level_order: 8, min_score: 22.0 },
        { drd_level_order: 9, min_score: 25.0 },
      ],
    },
    {
      name: 'Processos Mapeados e Documentados',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Entrega',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 1.0 },
        { drd_level_order: 2, min_score: 2.0 },
        { drd_level_order: 3, min_score: 3.0 },
        { drd_level_order: 4, min_score: 4.0 },
        { drd_level_order: 5, min_score: 5.0 },
        { drd_level_order: 6, min_score: 6.0 },
        { drd_level_order: 7, min_score: 7.0 },
        { drd_level_order: 8, min_score: 8.0 },
        { drd_level_order: 9, min_score: 10.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Metodologias e Ferramentas',
      order: 1,
      drdTopicItems: [
        {
          name: 'Notação BPMN e Mapeamento',
          description: 'Domínio de técnicas de modelagem de processos (AS-IS e TO-BE) utilizando softwares específicos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 3 ? 3 : 5 })),
        },
        {
          name: 'Metodologias Ágeis e Lean',
          description: 'Aplicação de conceitos de eliminação de desperdícios, Kanban, 5S e Kaizen para otimização de fluxos.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        }
      ],
    },
    {
      name: 'Análise de Desempenho',
      order: 2,
      drdTopicItems: [
        {
          name: 'Definição de KPIs e SLAs',
          description: 'Capacidade de criar indicadores de desempenho e acordos de nível de serviço para monitorar a saúde dos processos.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        },
        {
          name: 'Identificação de Gargalos e Riscos',
          description: 'Habilidade analítica para detectar pontos críticos que impedem a fluidez operacional e sugerir planos de contingência.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Implementação e Gestão de Mudanças',
      order: 3,
      drdTopicItems: [
        {
          name: 'Treinamento e Aculturamento',
          description: 'Capacidade de disseminar novos processos para as equipes operacionais, garantindo a adoção das mudanças.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 3 })),
        },
        {
          name: 'Documentação e Manuais',
          description: 'Excelência na redação de POPs (Procedimentos Operacionais Padrão) e guias de referência rápida.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
