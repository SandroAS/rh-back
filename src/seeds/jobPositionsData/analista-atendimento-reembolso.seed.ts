import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Analista de Atendimento e Reembolsos',
  cbo_code: '4110-10',
  base_salary: 0,
  description: 'Responsável pelo suporte direto ao cliente, análise de solicitações de reembolso, verificação de documentação e garantia da satisfação e conformidade dos processos financeiros de suporte.',
  metrics: [
    {
      name: 'CSAT (Customer Satisfaction Score)',
      order: 1,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade do Atendimento',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 3.5 },
        { drd_level_order: 2, min_score: 3.8 },
        { drd_level_order: 3, min_score: 4.0 },
        { drd_level_order: 4, min_score: 4.2 },
        { drd_level_order: 5, min_score: 4.4 },
        { drd_level_order: 6, min_score: 4.6 },
        { drd_level_order: 7, min_score: 4.7 },
        { drd_level_order: 8, min_score: 4.8 },
        { drd_level_order: 9, min_score: 4.9 },
      ],
    },
    {
      name: 'Tempo Médio de Resposta (Minutos)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Eficiência Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 120 },
        { drd_level_order: 2, min_score: 90 },
        { drd_level_order: 3, min_score: 60 },
        { drd_level_order: 4, min_score: 45 },
        { drd_level_order: 5, min_score: 30 },
        { drd_level_order: 6, min_score: 20 },
        { drd_level_order: 7, min_score: 15 },
        { drd_level_order: 8, min_score: 10 },
        { drd_level_order: 9, min_score: 5 },
      ],
    },
    {
      name: 'Precisão de Reembolso (Taxa de Erro)',
      order: 3,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Conformidade Financeira',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5.0 },
        { drd_level_order: 2, min_score: 4.0 },
        { drd_level_order: 3, min_score: 3.0 },
        { drd_level_order: 4, min_score: 2.0 },
        { drd_level_order: 5, min_score: 1.0 },
        { drd_level_order: 6, min_score: 0.5 },
        { drd_level_order: 7, min_score: 0.3 },
        { drd_level_order: 8, min_score: 0.1 },
        { drd_level_order: 9, min_score: 0.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Habilidades Técnicas e Processos',
      order: 1,
      drdTopicItems: [
        {
          name: 'Análise de Documentação e Elegibilidade',
          description: 'Capacidade de validar notas fiscais, recibos e termos de serviço para aprovação de reembolsos.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Domínio de Ferramentas de CRM e Helpdesk',
          description: 'Uso avançado de sistemas como Zendesk, Salesforce ou similares para registro e tracking.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Prevenção de Fraudes em Reembolsos',
          description: 'Identificação de padrões suspeitos, duplicidade de notas e comportamentos fraudulentos.',
          order: 3,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 3 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Comunicação e Relacionamento',
      order: 2,
      drdTopicItems: [
        {
          name: 'Empatia e Resolução de Conflitos',
          description: 'Habilidade de lidar com clientes frustrados e comunicar negativas de reembolso de forma profissional.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Comunicação Escrita e Redação',
          description: 'Clareza, gramática e tom de voz adequado em e-mails e chats corporativos.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Gestão e Melhoria Contínua',
      order: 3,
      drdTopicItems: [
        {
          name: 'Organização e Gestão de Backlog',
          description: 'Priorização de tickets e cumprimento de SLAs em períodos de alta demanda.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Sugestão de Melhorias em Processos',
          description: 'Capacidade de identificar gargalos operacionais e sugerir automações ou mudanças nas regras de negócio.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 1 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 2 }, { drd_level_order: 5, min_score: 3 }, { drd_level_order: 6, min_score: 3 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 4 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
