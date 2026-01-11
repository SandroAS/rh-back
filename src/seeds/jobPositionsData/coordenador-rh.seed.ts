import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Coordenador de RH',
  cbo_code: '1232-05',
  base_salary: 0,
  description: 'Responsável pela coordenação das subsistemas de RH, garantindo o alinhamento entre as políticas de gestão de pessoas e os objetivos estratégicos da organização.',
  metrics: [
    {
      name: 'Índice de Turnover Global (Anualizado)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Retenção Estratégica',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 25 },
        { drd_level_order: 2, min_score: 22 },
        { drd_level_order: 3, min_score: 20 },
        { drd_level_order: 4, min_score: 18 },
        { drd_level_order: 5, min_score: 15 },
        { drd_level_order: 6, min_score: 12 },
        { drd_level_order: 7, min_score: 10 },
        { drd_level_order: 8, min_score: 8 },
        { drd_level_order: 9, min_score: 6 },
      ],
    },
    {
      name: 'eNPS (Employee Net Promoter Score)',
      order: 2,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Clima e Cultura',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 30 },
        { drd_level_order: 2, min_score: 40 },
        { drd_level_order: 3, min_score: 50 },
        { drd_level_order: 4, min_score: 60 },
        { drd_level_order: 5, min_score: 70 },
        { drd_level_order: 6, min_score: 75 },
        { drd_level_order: 7, min_score: 80 },
        { drd_level_order: 8, min_score: 85 },
        { drd_level_order: 9, min_score: 90 },
      ],
    },
  ],
  topics: [
    {
      name: 'Responsabilidades Organizacionais',
      order: 1,
      drdTopicItems: [
        {
          name: 'Alinhamento com OKRs e Estratégia de Negócio',
          description: 'Avalie a capacidade da coordenadora em traduzir os objetivos de negócio em planos de ação práticos para o RH.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: Math.min(5, 2 + Math.floor(i / 2)) })),
        },
        {
          name: 'Zelo pela cultura da organização',
          description: 'Atua como guardiã da cultura, garantindo que as lideranças pratiquem os valores da empresa no dia a dia.',
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
      name: 'Competências Técnicas',
      order: 2,
      drdTopicItems: [
        {
          name: 'Gestão de Subsistemas (T&D, R&S, C&B, DP)',
          description: 'Habilidade em supervisionar as diferentes áreas do RH, garantindo que todas operem com excelência e integração.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Desenvolvimento de Lideranças',
          description: 'Capacidade de mentorar gestores e coordenar programas de treinamento voltados para a gestão de equipes.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'People Analytics e Dashboards',
          description: 'Uso de dados para tomada de decisão, monitorando indicadores de turnover, absenteísmo e headcount.',
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
          name: 'Compliance Trabalhista e Gestão de Riscos',
          description: 'Garantir que as práticas de RH estejam em total conformidade legal para evitar passivos trabalhistas.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 5 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Segurança de Dados e Confidencialidade',
          description: 'Gestão rigorosa de informações sensíveis da diretoria e dos colaboradores (salários, promoções, feedbacks).',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 5 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Reputação e Posicionamento de Mercado',
      order: 4,
      drdTopicItems: [
        {
          name: 'Employer Branding Estratégico',
          description: 'Posicionamento da marca empregadora no mercado para atrair talentos de alto nível e reduzir o custo de contratação.',
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
      name: 'Cultura Organizacional Forte e Engajamento',
      order: 5,
      drdTopicItems: [
        {
          name: 'Pesquisa de Clima e Planos de Ação',
          description: 'Capacidade de diagnosticar o clima organizacional e implementar mudanças reais que aumentem o engajamento.',
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
      name: 'Eficiência Operacional e Escalabilidade',
      order: 6,
      drdTopicItems: [
        {
          name: 'Estruturação de Processos Escaláveis de RH',
          order: 1,
          description: 'Criação de processos que permitam o crescimento da empresa (ramping) sem perda de qualidade na gestão de pessoas.',
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 3 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Crescimento Sustentável',
      order: 7,
      drdTopicItems: [
        {
          name: 'Sucessão e Planejamento de Headcount',
          description: 'Identificação de talentos internos para posições chave e planejamento financeiro da folha de pagamento.',
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
      name: 'Inovação no Desenvolvimento de Produtos',
      order: 8,
      drdTopicItems: [
        {
          name: 'Inovação em Modelos de Trabalho e Gestão',
          description: 'Implementação de novas metodologias de avaliação de desempenho, feedback 360 e modelos híbridos/remotos.',
          order: 1,
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
