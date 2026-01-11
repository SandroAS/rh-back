import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Gestor de Tráfego',
  cbo_code: '2531-15',
  base_salary: 0,
  description: 'Gestão, otimização e escala de campanhas de anúncios pagos em canais digitais para maximizar conversões e ROI.',
  metrics: [
    {
      name: 'ROAS (Return on Ad Spend)',
      order: 1,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Performance Financeira',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 2 },
        { drd_level_order: 2, min_score: 2.5 },
        { drd_level_order: 3, min_score: 3 },
        { drd_level_order: 4, min_score: 3.5 },
        { drd_level_order: 5, min_score: 4 },
        { drd_level_order: 6, min_score: 4.5 },
        { drd_level_order: 7, min_score: 5 },
        { drd_level_order: 8, min_score: 6 },
        { drd_level_order: 9, min_score: 8 },
      ],
    },
    {
      name: 'CPA (Custo por Aquisição) vs. Target',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Eficiência Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 110 },
        { drd_level_order: 2, min_score: 105 },
        { drd_level_order: 3, min_score: 100 },
        { drd_level_order: 4, min_score: 95 },
        { drd_level_order: 5, min_score: 90 },
        { drd_level_order: 6, min_score: 85 },
        { drd_level_order: 7, min_score: 80 },
        { drd_level_order: 8, min_score: 75 },
        { drd_level_order: 9, min_score: 70 },
      ],
    },
  ],
  topics: [
    {
      name: 'Domínio Técnico de Plataformas',
      order: 1,
      drdTopicItems: [
        {
          name: 'Gestão de Meta Ads / Google Ads',
          description: 'Configuração avançada de campanhas, pixels, APIs de conversão e estruturas de conta (CBO/ABO).',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Tracking e Atribuição',
          description: 'Capacidade de implementar GTM, GA4 e interpretar modelos de atribuição para evitar perda de dados.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Análise e Estratégia',
      order: 2,
      drdTopicItems: [
        {
          name: 'Testes A/B e Otimização de Criativos',
          description: 'Análise de métricas secundárias (CTR, Hook Rate) para orientar o time criativo em novas produções.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Escala e Planejamento de Verba',
          description: 'Capacidade de aumentar o investimento mantendo a eficiência e projetar cenários de gastos.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Responsabilidades Organizacionais',
      order: 3,
      drdTopicItems: [
        {
          name: 'Documentação e Reporte',
          description: 'Criação de dashboards claros e relatórios que traduzam dados técnicos para stakeholders de negócio.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Zelo pelo Budget (Budget Compliance)',
          description: 'Garantir que não haja estouros de verba ou subutilização crítica dos recursos aprovados.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 5 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Visão de Funil e Colaboração Interdepartamental',
          description: 'Entendimento de como o tráfego impacta o time de vendas (CRM) e o time de produto.',
          order: 3,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
