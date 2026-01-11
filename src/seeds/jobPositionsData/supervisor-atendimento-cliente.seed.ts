import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Supervisor de Atendimento ao Cliente',
  cbo_code: '1423-15',
  base_salary: 0,
  description: 'Liderança operacional do time de suporte e atendimento, responsável por garantir a qualidade do serviço, o cumprimento de metas de SLA e o desenvolvimento da equipe.',
  metrics: [
    {
      name: 'SLA de Atendimento (Time)',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 80.0 },
        { drd_level_order: 2, min_score: 82.5 },
        { drd_level_order: 3, min_score: 85.0 },
        { drd_level_order: 4, min_score: 87.5 },
        { drd_level_order: 5, min_score: 90.0 },
        { drd_level_order: 6, min_score: 92.5 },
        { drd_level_order: 7, min_score: 95.0 },
        { drd_level_order: 8, min_score: 97.5 },
        { drd_level_order: 9, min_score: 99.0 },
      ],
    },
    {
      name: 'CSAT (Satisfação do Cliente) da Equipe',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 70.0 },
        { drd_level_order: 2, min_score: 74.0 },
        { drd_level_order: 3, min_score: 78.0 },
        { drd_level_order: 4, min_score: 82.0 },
        { drd_level_order: 5, min_score: 85.0 },
        { drd_level_order: 6, min_score: 88.0 },
        { drd_level_order: 7, min_score: 91.0 },
        { drd_level_order: 8, min_score: 94.0 },
        { drd_level_order: 9, min_score: 97.0 },
      ],
    },
    {
      name: 'Taxa de Turnover da Equipe',
      order: 3,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MENOR_OU_IGUAL,
      classification: 'Gestão de Pessoas',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 15.0 },
        { drd_level_order: 2, min_score: 12.0 },
        { drd_level_order: 3, min_score: 10.0 },
        { drd_level_order: 4, min_score: 8.0 },
        { drd_level_order: 5, min_score: 6.0 },
        { drd_level_order: 6, min_score: 5.0 },
        { drd_level_order: 7, min_score: 4.0 },
        { drd_level_order: 8, min_score: 3.0 },
        { drd_level_order: 9, min_score: 2.0 },
      ],
    },
  ],
  topics: [
    {
      name: 'Responsabilidades Organizacionais',
      order: 1,
      drdTopicItems: [
        {
          name: 'Alinhamento Cultural e Ética',
          description: 'Promover os valores da empresa dentro do time e garantir conduta ética exemplar.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Colaboração Interdepartamental',
          description: 'Interface ativa com Produto, Vendas e Sucesso do Cliente para reportar falhas e sugerir melhorias.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Pontualidade e Entrega de Reports',
          description: 'Cumprimento de prazos para relatórios gerenciais e assiduidade em reuniões estratégicas.',
          order: 3,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Gestão de Operações de Suporte',
      order: 2,
      drdTopicItems: [
        {
          name: 'Monitoria de Qualidade',
          description: 'Habilidade em auditar chamados, avaliar a linguagem técnica e a cordialidade dos analistas.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Gestão de Escaladas',
          description: 'Capacidade de lidar com clientes críticos e resolver problemas complexos que o time não conseguiu sanar.',
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
      name: 'Liderança e Desenvolvimento',
      order: 3,
      drdTopicItems: [
        {
          name: 'Feedback e 1:1s',
          description: 'Frequência e qualidade das reuniões individuais para correção de rota e desenvolvimento profissional.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Treinamento e Capacitação',
          description: 'Identificação de lacunas de conhecimento e criação de trilhas de aprendizado para a equipe.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 1 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 3 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 4 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Análise de Dados e Report',
      order: 4,
      drdTopicItems: [
        {
          name: 'Relatórios de Produtividade',
          description: 'Criação e análise de dashboards com TMA, TME, volume de tickets e backlog.',
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
