import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Assistente de Departamento Pessoal',
  cbo_code: '4110-30',
  base_salary: 0,
  description: 'Profissional responsável pelo suporte operacional nas rotinas de administração de pessoal, incluindo admissão, folha de pagamento, benefícios e conformidade legal.',
  metrics: [
    {
      name: 'Acuracidade da Folha de Pagamento',
      order: 1,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Eficiência Operacional',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 95 },
        { drd_level_order: 2, min_score: 96 },
        { drd_level_order: 3, min_score: 97 },
        { drd_level_order: 4, min_score: 98 },
        { drd_level_order: 5, min_score: 98.5 },
        { drd_level_order: 6, min_score: 99 },
        { drd_level_order: 7, min_score: 99.5 },
        { drd_level_order: 8, min_score: 99.8 },
        { drd_level_order: 9, min_score: 100 },
      ],
    },
    {
      name: 'Prazo de Entrega de Encargos (SLA)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Conformidade Técnica',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 100 },
        { drd_level_order: 2, min_score: 100 },
        { drd_level_order: 3, min_score: 100 },
        { drd_level_order: 4, min_score: 100 },
        { drd_level_order: 5, min_score: 100 },
        { drd_level_order: 6, min_score: 100 },
        { drd_level_order: 7, min_score: 100 },
        { drd_level_order: 8, min_score: 100 },
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
          name: 'Contribuição nas métricas organizacionais',
          description: 'Capacidade de cumprir os cronogramas mensais de DP, evitando multas e garantindo a satisfação dos colaboradores.',
          order: 1,
          scoresByLevel: Array.from({ length: 9 }, (_, i) => ({ drd_level_order: i + 1, min_score: Math.min(5, 2 + Math.floor(i / 2)) })),
        },
        {
          name: 'Zelo pela cultura da organização',
          description: 'Promove um ambiente ético e transparente no tratamento de questões sensíveis como pagamentos e conduta.',
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
          name: 'Processamento de Admissões e Documentação',
          description: 'Habilidade em organizar prontuários e garantir que 100% da documentação legal esteja correta no prazo.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Cálculos de Proventos e Descontos',
          description: 'Conhecimento técnico em cálculos de horas extras, adicionais, INSS, IRRF e FGTS.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Gestão de Benefícios e Ponto Eletrônico',
          description: 'Operação de sistemas de ponto, tratamento de exceções e compra de benefícios (VT, VR, VA, Saúde).',
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
      name: 'Segurança Operacional e Confiabilidade',
      order: 3,
      drdTopicItems: [
        {
          name: 'Conformidade com eSocial e Legislação Trabalhista',
          description: 'Garante que todos os eventos do eSocial sejam enviados sem erros e em conformidade com a CLT.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 5 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Confiabilidade de Dados no Sistema de Folha',
          description: 'Manutenção rigorosa do cadastro de funcionários, garantindo integridade total para relatórios contábeis.',
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
          name: 'Atendimento ao Colaborador e Employee Experience',
          description: 'Qualidade e clareza nas respostas às dúvidas dos funcionários sobre seus vencimentos e direitos.',
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
      name: 'Cultura Organizacional Forte e Engajamento',
      order: 5,
      drdTopicItems: [
        {
          name: 'Comunicação Interna de DP',
          description: 'Habilidade em comunicar prazos de benefícios, férias e feriados de forma eficaz e engajadora.',
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
      name: 'Eficiência Operacional e Escalabilidade',
      order: 6,
      drdTopicItems: [
        {
          name: 'Automação de Processos Repetitivos',
          order: 1,
          description: 'Busca por simplificar planilhas e processos manuais para suportar o crescimento do volume de colaboradores.',
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
      order: 7,
      drdTopicItems: [
        {
          name: 'Análise de Turnover e Absenteísmo',
          description: 'Apoio na geração de indicadores que auxiliam a diretoria a entender a saúde do capital humano.',
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
          name: 'Adoção de Novas Ferramentas de HCM/Software de Folha',
          description: 'Acompanhamento de novas tecnologias de mercado para RH digital e autoatendimento do colaborador.',
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
} as JobPositionDefinition;
