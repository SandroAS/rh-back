import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'UX Lead',
  cbo_code: '2124-05',
  base_salary: 0,
  description: 'Liderança estratégica de design, responsável por alinhar a experiência do usuário aos objetivos de negócio, gerir a cultura de design na organização e mentorar outros designers.',
  metrics: [
    {
      name: 'Impacto de UX no ROI / Conversão',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Negócio',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5.0 },
        { drd_level_order: 2, min_score: 8.0 },
        { drd_level_order: 3, min_score: 12.0 },
        { drd_level_order: 4, min_score: 15.0 },
        { drd_level_order: 5, min_score: 20.0 },
        { drd_level_order: 6, min_score: 25.0 },
        { drd_level_order: 7, min_score: 30.0 },
        { drd_level_order: 8, min_score: 35.0 },
        { drd_level_order: 9, min_score: 40.0 },
      ],
    },
    {
      name: 'Eficiência de Design (Time-to-Market de Prototipagem)',
      order: 2,
      type: MetricType.DURATION_DAYS,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Processo',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 20.0 }, // dias para ciclo completo
        { drd_level_order: 2, min_score: 18.0 },
        { drd_level_order: 3, min_score: 15.0 },
        { drd_level_order: 4, min_score: 12.0 },
        { drd_level_order: 5, min_score: 10.0 },
        { drd_level_order: 6, min_score: 8.0 },
        { drd_level_order: 7, min_score: 7.0 },
        { drd_level_order: 8, min_score: 6.0 },
        { drd_level_order: 9, min_score: 5.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Estratégia e Visão de Design',
      order: 1,
      drdTopicItems: [
        {
          name: 'Alinhamento com Objetivos de Negócio',
          description: 'Capacidade de traduzir necessidades de negócio em soluções de design que gerem valor e resultados mensuráveis.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 5 ? 3 : 5 })),
        },
        {
          name: 'Evangelização de UX (Cultura)',
          description: 'Promover a cultura de design centrado no usuário em todos os níveis da empresa, incluindo diretoria e stakeholders.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Gestão de Operações de Design (Design Ops)',
      order: 2,
      drdTopicItems: [
        {
          name: 'Governança de Design System',
          description: 'Definição de processos de escalabilidade, manutenção e adoção de padrões visuais e de interação entre times.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        },
        {
          name: 'Gestão de Ferramentas e Processos',
          description: 'Otimização do workflow da equipe, escolha de ferramentas e melhoria contínua dos processos de entrega.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 4 })),
        }
      ],
    },
    {
      name: 'Liderança e Mentoria',
      order: 3,
      drdTopicItems: [
        {
          name: 'Desenvolvimento de Talentos',
          description: 'Realização de feedbacks, suporte no plano de carreira (PDI) e mentoria técnica para designers Júnior e Pleno.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: i < 4 ? 2 : 5 })),
        },
        {
          name: 'Crítica de Design (Design Critique)',
          description: 'Facilitação de sessões de crítica para elevar a qualidade técnica e criativa do time de forma construtiva.',
          order: 2,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })),
        }
      ],
    },
  ],
} as JobPositionDefinition;
