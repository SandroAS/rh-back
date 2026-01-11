import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Assistente de Compliance',
  cbo_code: '2522-10',
  base_salary: 0,
  description: 'Suporte na execução de auditorias internas, monitoramento de controles, suporte ao canal de denúncias e verificação de conformidade com políticas e legislações vigentes.',
  metrics: [
    {
      name: 'Tempo Médio de Resposta a Incidentes (Triagem)',
      order: 1,
      type: MetricType.DURATION_HOURS,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Eficiência Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 72 },
        { drd_level_order: 2, min_score: 48 },
        { drd_level_order: 3, min_score: 36 },
        { drd_level_order: 4, min_score: 24 },
        { drd_level_order: 5, min_score: 18 },
        { drd_level_order: 6, min_score: 12 },
        { drd_level_order: 7, min_score: 8 },
        { drd_level_order: 8, min_score: 4 },
        { drd_level_order: 9, min_score: 2 },
      ],
    },
    {
      name: 'Taxa de Cobertura de Treinamentos Normativos',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Educação e Cultura',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 80 },
        { drd_level_order: 2, min_score: 85 },
        { drd_level_order: 3, min_score: 90 },
        { drd_level_order: 4, min_score: 95 },
        { drd_level_order: 5, min_score: 96 },
        { drd_level_order: 6, min_score: 97 },
        { drd_level_order: 7, min_score: 98 },
        { drd_level_order: 8, min_score: 99 },
        { drd_level_order: 9, min_score: 100 },
      ],
    },
  ],
  topics: [
    {
      name: 'Responsabilidades Organizacionais',
      order: 1,
      drdTopicItems: [
        {
          name: 'Confidencialidade e Sigilo Profissional',
          description: 'Capacidade de lidar com informações sensíveis e denúncias mantendo total discrição e ética.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: 5 })), // Exigência máxima desde o início
        },
      ],
    },
    {
      name: 'Competências Técnicas',
      order: 2,
      drdTopicItems: [
        {
          name: 'Monitoramento de Controles Internos',
          description: 'Execução de checklists e testes de conformidade para garantir que os processos seguem as políticas.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Domínio de Legislação e Normas (LGPD/Compliance)',
          description: 'Conhecimento aplicado de leis específicas e do código de conduta da organização.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Segurança Operacional e Risco',
      order: 3,
      drdTopicItems: [
        {
          name: 'Identificação Proativa de Riscos',
          description: 'Habilidade em detectar possíveis falhas de processo que possam gerar passivos legais ou éticos.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Eficiência Operacional',
      order: 4,
      drdTopicItems: [
        {
          name: 'Organização de Evidências Documentais',
          description: 'Manutenção de pastas, logs e registros de auditoria prontos para fiscalizações externas ou internas.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Relacionamento e Comunicação',
      order: 5,
      drdTopicItems: [
        {
          name: 'Didática em Orientações de Compliance',
          description: 'Clareza ao explicar regras e procedimentos para colaboradores de outras áreas sem gerar atritos.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
