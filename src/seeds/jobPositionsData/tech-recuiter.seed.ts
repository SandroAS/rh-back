import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';

export default {
  title: 'Tech Recruiter',
  cbo_code: '2524-05',
  base_salary: 0,
  description: 'Especialista em recrutamento e seleção para perfis técnicos, responsável pela jornada completa do candidato e alinhamento estratégico com Hiring Managers.',
  metrics: [
    {
      name: 'Tempo de Fechamento (SLA)',
      order: 1,
      type: MetricType.DURATION_DAYS,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Eficiência Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 40 },
        { drd_level_order: 2, min_score: 35 },
        { drd_level_order: 3, min_score: 30 },
        { drd_level_order: 4, min_score: 25 },
        { drd_level_order: 5, min_score: 22 },
        { drd_level_order: 6, min_score: 20 },
        { drd_level_order: 7, min_score: 18 },
        { drd_level_order: 8, min_score: 16 },
        { drd_level_order: 9, min_score: 15 },
      ],
    },
    {
      name: 'Qualidade da Contratação (Retention Rate 90 dias)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade Estratégica',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 75 },
        { drd_level_order: 2, min_score: 78 },
        { drd_level_order: 3, min_score: 80 },
        { drd_level_order: 4, min_score: 82 },
        { drd_level_order: 5, min_score: 85 },
        { drd_level_order: 6, min_score: 88 },
        { drd_level_order: 7, min_score: 90 },
        { drd_level_order: 8, min_score: 93 },
        { drd_level_order: 9, min_score: 95 },
      ],
    },
  ],
  topics: [
    {
      name: 'Responsabilidades Organizacionais',
      order: 1,
      drdTopicItems: [
        {
          name: 'Contribuição nas métricas organizacionais',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: Math.min(5, 2 + Math.floor(i / 2)) })),
        },
        {
          name: 'Zelo pela cultura da organização',
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
      name: 'Competências Técnicas',
      order: 2,
      drdTopicItems: [
        {
          name: 'Sourcing / Hunting (Busca Ativa)',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Entrevista Técnica e Avaliação de Soft Skills',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Análise de Tech Stack e Ecossistema Tech',
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
          name: 'Conformidade com LGPD e Ética no Recrutamento',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 5 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Confiabilidade de Dados no ATS',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
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
          name: 'Employer Branding e Atração de Talentos',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 2 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 3 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Cultura Organizacional Forte e Engajamento',
      order: 5,
      drdTopicItems: [
        {
          name: 'Experiência do Candidato (Candidate NPS)',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
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
          name: 'Otimização do Funil de Recrutamento',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 1 }, { drd_level_order: 3, min_score: 2 },
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
          name: 'Planejamento e Forecast de Contratações',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 1 }, { drd_level_order: 3, min_score: 1 },
            { drd_level_order: 4, min_score: 2 }, { drd_level_order: 5, min_score: 2 }, { drd_level_order: 6, min_score: 3 },
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
          name: 'Adoção de Novas Tecnologias de Seleção e IA',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 1 }, { drd_level_order: 3, min_score: 1 },
            { drd_level_order: 4, min_score: 2 }, { drd_level_order: 5, min_score: 2 }, { drd_level_order: 6, min_score: 3 },
            { drd_level_order: 7, min_score: 4 }, { drd_level_order: 8, min_score: 4 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
};
