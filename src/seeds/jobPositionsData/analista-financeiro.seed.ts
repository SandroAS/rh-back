import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Analista Financeiro',
  cbo_code: '2522-10',
  base_salary: 0,
  description: 'Responsável pelo monitoramento do fluxo de caixa, conciliação bancária, suporte ao planejamento orçamentário e geração de relatórios para suporte à tomada de decisão financeira.',
  metrics: [
    {
      name: 'Acuracidade do Fluxo de Caixa (Forecast vs Real)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência de Planejamento',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 75 },
        { drd_level_order: 2, min_score: 80 },
        { drd_level_order: 3, min_score: 85 },
        { drd_level_order: 4, min_score: 90 },
        { drd_level_order: 5, min_score: 92 },
        { drd_level_order: 6, min_score: 94 },
        { drd_level_order: 7, min_score: 96 },
        { drd_level_order: 8, min_score: 98 },
        { drd_level_order: 9, min_score: 99 },
      ],
    },
    {
      name: 'Prazo Médio de Recebimento (PMR)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Ciclo Financeiro',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 45 },
        { drd_level_order: 2, min_score: 40 },
        { drd_level_order: 3, min_score: 35 },
        { drd_level_order: 4, min_score: 30 },
        { drd_level_order: 5, min_score: 28 },
        { drd_level_order: 6, min_score: 25 },
        { drd_level_order: 7, min_score: 22 },
        { drd_level_order: 8, min_score: 20 },
        { drd_level_order: 9, min_score: 15 },
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
          description: 'Capacidade de cumprir calendários rigorosos de fechamento mensal, pagamentos e envio de obrigações.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: Math.min(5, 3 + Math.floor(i / 3)) })),
        },
      ],
    },
    {
      name: 'Competências Técnicas',
      order: 2,
      drdTopicItems: [
        {
          name: 'Conciliação Bancária e Fluxo de Caixa',
          description: 'Domínio técnico na conferência de lançamentos, identificação de divergências e manutenção do saldo projetado.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Domínio de ERP e Excel/BI',
          description: 'Habilidade em extrair dados do sistema de gestão e tratá-los em planilhas ou ferramentas de visualização de forma eficiente.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Análise de Variações (Budget vs Actual)',
          description: 'Capacidade de explicar desvios entre o orçado e o realizado, sugerindo correções de rota.',
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
      name: 'Segurança Operacional e Confiabilidade',
      order: 3,
      drdTopicItems: [
        {
          name: 'Integridade dos Lançamentos Financeiros',
          description: 'Acuracidade absoluta na entrada de dados para evitar erros de pagamento ou reporte fiscal.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 5 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Conformidade com Normas Fiscais',
          description: 'Zelo pela aplicação correta de retenções de impostos e classificação de centros de custo.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Eficiência Operacional e Escalabilidade',
      order: 4,
      drdTopicItems: [
        {
          name: 'Otimização de Processos de Contas a Pagar/Receber',
          description: 'Implementação de automações ou melhorias de fluxo que reduzam o trabalho manual e erros.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 1 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 2 }, { drd_level_order: 5, min_score: 3 }, { drd_level_order: 6, min_score: 3 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 4 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Crescimento Sustentável',
      order: 5,
      drdTopicItems: [
        {
          name: 'Análise de Viabilidade e Redução de Custos',
          description: 'Identificação proativa de desperdícios e sugestão de oportunidades para melhoria de margem.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 1 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 3 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
