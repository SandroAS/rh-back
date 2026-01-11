import { MetricPrefix, MetricType } from '@/entities/drd-metric.entity';
import { JobPositionDefinition } from './job-positions-data-definition';

export default {
  title: 'Videomaker',
  cbo_code: '3744-20',
  base_salary: 0,
  description: 'Produção, captação e edição de conteúdo audiovisual, garantindo qualidade técnica e narrativa alinhada aos objetivos da marca.',
  metrics: [
    {
      name: 'Volume de Entregas (Vídeos Finalizados)',
      order: 1,
      type: MetricType.QUANTITY,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Produtividade',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 4 },
        { drd_level_order: 2, min_score: 6 },
        { drd_level_order: 3, min_score: 8 },
        { drd_level_order: 4, min_score: 10 },
        { drd_level_order: 5, min_score: 12 },
        { drd_level_order: 6, min_score: 14 },
        { drd_level_order: 7, min_score: 16 },
        { drd_level_order: 8, min_score: 18 },
        { drd_level_order: 9, min_score: 20 },
      ],
    },
    {
      name: 'Média de Retenção do Conteúdo (Watch Time)',
      order: 2,
      type: MetricType.PERCENTAGE,
      prefix: MetricPrefix.MAIOR_OU_IGUAL,
      classification: 'Qualidade Narrativa',
      scoresByLevel: [
        { drd_level_order: 1, min_score: 30 },
        { drd_level_order: 2, min_score: 35 },
        { drd_level_order: 3, min_score: 40 },
        { drd_level_order: 4, min_score: 45 },
        { drd_level_order: 5, min_score: 50 },
        { drd_level_order: 6, min_score: 55 },
        { drd_level_order: 7, min_score: 60 },
        { drd_level_order: 8, min_score: 65 },
        { drd_level_order: 9, min_score: 70 },
      ],
    },
  ],
  topics: [
    {
      name: 'Captação e Produção',
      order: 1,
      drdTopicItems: [
        {
          name: 'Domínio de Equipamento e Iluminação',
          description: 'Operação de câmeras, lentes, setups de luz e captação de áudio limpo em diferentes ambientes.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 3 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Direção de Cena e Enquadramento',
          description: 'Condução de entrevistados/atores e escolha de ângulos que reforçam a narrativa e estética da marca.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 2 }, { drd_level_order: 2, min_score: 2 }, { drd_level_order: 3, min_score: 3 },
            { drd_level_order: 4, min_score: 4 }, { drd_level_order: 5, min_score: 4 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
    {
      name: 'Pós-Produção',
      order: 2,
      drdTopicItems: [
        {
          name: 'Edição Não Linear e Storytelling',
          description: 'Montagem rítmica, cortes precisos e construção de narrativa envolvente (Adobe Premiere/Final Cut/DaVinci).',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 3 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Color Grading e Motion Graphics',
          description: 'Tratamento de cor profissional e criação de elementos gráficos, legendas dinâmicas e efeitos visuais básicos.',
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
      name: 'Responsabilidades Organizacionais',
      order: 3,
      drdTopicItems: [
        {
          name: 'Gestão de Ativos e Backup',
          description: 'Organização rigorosa de arquivos brutos, projetos e backups para garantir a segurança da produção.',
          order: 1,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 5 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Cumprimento de Prazos e Workflow',
          description: 'Respeito ao cronograma de lançamentos e agilidade no processo de revisão e aprovação.',
          order: 2,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 4 }, { drd_level_order: 2, min_score: 4 }, { drd_level_order: 3, min_score: 4 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
        {
          name: 'Zelo pelo Equipamento',
          description: 'Manutenção, limpeza e guarda cuidadosa de câmeras, lentes e acessórios de alto valor.',
          order: 3,
          scoresByLevel: [
            { drd_level_order: 1, min_score: 5 }, { drd_level_order: 2, min_score: 5 }, { drd_level_order: 3, min_score: 5 },
            { drd_level_order: 4, min_score: 5 }, { drd_level_order: 5, min_score: 5 }, { drd_level_order: 6, min_score: 5 },
            { drd_level_order: 7, min_score: 5 }, { drd_level_order: 8, min_score: 5 }, { drd_level_order: 9, min_score: 5 },
          ],
        },
      ],
    },
  ],
} as JobPositionDefinition;
