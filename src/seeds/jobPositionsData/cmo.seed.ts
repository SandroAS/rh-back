import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'CMO',
  cbo_code: '1233-05',
  base_salary: 0,
  description: 'Chief Marketing Officer - Direção executiva de marketing. Responsável por definir e executar a estratégia global de marca, aquisição, retenção e crescimento da receita.',
  metrics: [
    {
      name: 'Relação LTV / CAC',
      order: 1,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência de Crescimento',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 2.0 },
        { drd_level_order: 2, min_score: 2.3 },
        { drd_level_order: 3, min_score: 2.6 },
        { drd_level_order: 4, min_score: 3.0 },
        { drd_level_order: 5, min_score: 3.5 },
        { drd_level_order: 6, min_score: 4.0 },
        { drd_level_order: 7, min_score: 4.5 },
        { drd_level_order: 8, min_score: 5.0 },
        { drd_level_order: 9, min_score: 6.0 },
      ],
    },
    {
      name: 'Marketing Contribution to Revenue',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Impacto em Vendas',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 20 },
        { drd_level_order: 2, min_score: 25 },
        { drd_level_order: 3, min_score: 30 },
        { drd_level_order: 4, min_score: 35 },
        { drd_level_order: 5, min_score: 40 },
        { drd_level_order: 6, min_score: 45 },
        { drd_level_order: 7, min_score: 50 },
        { drd_level_order: 8, min_score: 55 },
        { drd_level_order: 9, min_score: 60 },
      ],
    },
    {
      name: 'Market Share Growth (YoY)',
      order: 3,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Posição de Mercado',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 2 },
        { drd_level_order: 2, min_score: 4 },
        { drd_level_order: 3, min_score: 6 },
        { drd_level_order: 4, min_score: 8 },
        { drd_level_order: 5, min_score: 10 },
        { drd_level_order: 6, min_score: 12 },
        { drd_level_order: 7, min_score: 15 },
        { drd_level_order: 8, min_score: 20 },
        { drd_level_order: 9, min_score: 25 },
      ],
    },
  ],
  topics: [
    {
      name: 'Competências Técnicas e Analíticas',
      order: 1,
      drdTopicItems: [
        {
          name: 'Data-Driven Decision Making',
          description: 'Capacidade de interpretar dados complexos de BI e analytics para orientar pivôs estratégicos e investimentos.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Marketing Technology (MarTech) Stack',
          description: 'Definição e integração de ferramentas de CRM, automação, atribuição e IA para escala operacional.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Financial Acumen e P&L Management',
          description: 'Gestão completa do orçamento de marketing, demonstrando retorno sobre investimento e eficiência financeira.',
          order: 3,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Growth Hacking e Experimentos',
          description: 'Domínio de metodologias de teste A/B, otimização de funil e descoberta de novos canais de tração.',
          order: 4,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Estratégia de Marca e Mercado',
      order: 2,
      drdTopicItems: [
        {
          name: 'Brand Equity e Branding de Alto Nível',
          description: 'Construção e proteção da percepção de marca, garantindo diferenciação competitiva e autoridade.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Posicionamento e Go-to-Market (GTM)',
          description: 'Estratégia de lançamento de produtos e penetração em novos mercados ou segmentos.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Customer Experience (CX) e Retenção',
          description: 'Foco na jornada do cliente para maximizar a fidelidade e reduzir o Churn Rate através do marketing.',
          order: 3,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Liderança e Responsabilidades Organizacionais',
      order: 3,
      drdTopicItems: [
        {
          name: 'Gestão de Talentos e Formação de Times',
          description: 'Capacidade de atrair, desenvolver e manter profissionais de alta performance em squads de marketing.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Stakeholder Management e Alinhamento C-Level',
          description: 'Comunicação executiva para alinhar marketing com vendas, produto e objetivos do Board/CEO.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Visão de Longo Prazo e Inovação',
          description: 'Antecipação de tendências de mercado e adoção de novas tecnologias/comportamentos de consumo.',
          order: 3,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Ética, Governança e Compliance (LGPD)',
          description: 'Garantir que todas as campanhas e coleta de dados respeitem normas legais e diretrizes éticas.',
          order: 4,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
