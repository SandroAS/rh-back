import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Assistente Financeiro',
  cbo_code: '4110-10',
  base_salary: 0,
  description: 'Execução de rotinas operacionais de contas a pagar e receber, faturamento, conciliação bancária e suporte na elaboração de relatórios de fluxo de caixa.',
  metrics: [
    {
      name: 'Acuracidade na Conciliação Bancária',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 95 },
        { drd_level_order: 2, min_score: 96 },
        { drd_level_order: 3, min_score: 97 },
        { drd_level_order: 4, min_score: 98 },
        { drd_level_order: 5, min_score: 99 },
        { drd_level_order: 6, min_score: 99.5 },
        { drd_level_order: 7, min_score: 99.8 },
        { drd_level_order: 8, min_score: 100 },
        { drd_level_order: 9, min_score: 100 },
      ],
    },
    {
      name: 'Índice de Pagamentos em Atraso (Erro Interno)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Eficiência Financeira',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5 },
        { drd_level_order: 2, min_score: 4 },
        { drd_level_order: 3, min_score: 3 },
        { drd_level_order: 4, min_score: 2 },
        { drd_level_order: 5, min_score: 1 },
        { drd_level_order: 6, min_score: 0.5 },
        { drd_level_order: 7, min_score: 0.2 },
        { drd_level_order: 8, min_score: 0.1 },
        { drd_level_order: 9, min_score: 0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Responsabilidades Organizacionais',
      order: 1,
      drdTopicItems: [
        {
          name: 'Organização e Gestão de Prazos',
          description: 'Habilidade em priorizar pagamentos críticos e respeitar os calendários fiscais e financeiros.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Competências Técnicas',
      order: 2,
      drdTopicItems: [
        {
          name: 'Contas a Pagar e Receber',
          description: 'Operação de lançamentos, baixa de títulos e conferência de notas fiscais com precisão.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Domínio de ERP e Ferramentas Financeiras',
          description: 'Proficiência no uso de sistemas de gestão (Totvs, SAP, Omie, etc.) e Excel para controle de planilhas.',
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
      name: 'Processos Internos',
      order: 3,
      drdTopicItems: [
        {
          name: 'Conciliação Bancária',
          description: 'Capacidade de identificar divergências entre o extrato bancário e o registro interno de forma ágil.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Relacionamento e Atendimento',
      order: 4,
      drdTopicItems: [
        {
          name: 'Comunicação com Fornecedores e Clientes',
          description: 'Postura profissional em cobranças e negociações de prorrogação de boletos ou resolução de dúvidas.',
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
