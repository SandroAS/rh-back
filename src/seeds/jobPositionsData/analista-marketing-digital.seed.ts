import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Analista de Marketing Digital',
  cbo_code: '2531-15',
  base_salary: 0,
  description: 'Responsável pelo planejamento, execução e otimização de campanhas em canais digitais, gestão de tráfego pago, SEO e análise de métricas de conversão.',
  metrics: [
    {
      name: 'Eficiência de ROAS (Return on Ad Spend)',
      order: 1,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Financeiro/Performance',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 2.0 },
        { drd_level_order: 2, min_score: 2.5 },
        { drd_level_order: 3, min_score: 3.0 },
        { drd_level_order: 4, min_score: 3.5 },
        { drd_level_order: 5, min_score: 4.0 },
        { drd_level_order: 6, min_score: 4.5 },
        { drd_level_order: 7, min_score: 5.0 },
        { drd_level_order: 8, min_score: 5.5 },
        { drd_level_order: 9, min_score: 6.0 },
      ],
    },
    {
      name: 'Taxa de Conversão do Funil (MQL para SQL)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficácia de Vendas',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 5 },
        { drd_level_order: 2, min_score: 8 },
        { drd_level_order: 3, min_score: 12 },
        { drd_level_order: 4, min_score: 15 },
        { drd_level_order: 5, min_score: 18 },
        { drd_level_order: 6, min_score: 20 },
        { drd_level_order: 7, min_score: 22 },
        { drd_level_order: 8, min_score: 25 },
        { drd_level_order: 9, min_score: 30 },
      ],
    },
  ],
  topics: [
    {
      name: 'Gestão de Canais e Tráfego',
      order: 1,
      drdTopicItems: [
        {
          name: 'Domínio de Plataformas de Ads',
          description: 'Habilidade técnica em configurar e otimizar campanhas no Google Ads e Meta Ads (Facebook/Instagram).',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'SEO e Autoridade de Domínio',
          description: 'Aplicação de técnicas On-page e Off-page para melhoria do posicionamento orgânico nos buscadores.',
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
      name: 'Análise e Data-Driven',
      order: 2,
      drdTopicItems: [
        {
          name: 'Web Analytics e Tagging',
          description: 'Configuração de Google Analytics 4 e GTM para rastreamento de eventos e conversões.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Testes A/B e Otimização de CRO',
          description: 'Capacidade de formular hipóteses e testar variações de Landing Pages para aumentar a conversão.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 3 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Copywriting e Criatividade',
      order: 3,
      drdTopicItems: [
        {
          name: 'Escrita Persuasiva e Storytelling',
          description: 'Criação de anúncios e conteúdos que geram engajamento e cliques baseados na persona.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
