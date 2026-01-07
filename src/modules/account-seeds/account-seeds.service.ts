import { Injectable, Logger } from '@nestjs/common';
import { JobPositionService } from '../job-positions/job-positions.service';
import { CreateJobPositionDto } from '../job-positions/dtos/create-job-position.dto';

@Injectable()
export class AccountSeedsService {
  private readonly logger = new Logger(AccountSeedsService.name);

  constructor(
    private readonly jobPositionService: JobPositionService,
  ) {}

  async runDefaultSeeds(accountId: number) {
    this.logger.log(`Populando cargos unificados para a conta ID: ${accountId}...`);

    try {
      await this.seedJobPositions(accountId);
      this.logger.log(`Seed de cargos finalizado com sucesso.`);
    } catch (error) {
      this.logger.error(`Erro durante o seed: ${error.message}`);
    }
  }

  private async seedJobPositions(accountId: number) {
    const defaultPositions: CreateJobPositionDto[] = [
      // --- RECURSOS HUMANOS & DP ---
      {
        title: 'Analista de Departamento Pessoal',
        cbo_code: '4110-10',
        description: 'Responsável pela gestão completa das rotinas de pessoal, incluindo admissão, demissão, folha de pagamento, benefícios e conformidade trabalhista, atuando desde o suporte operacional até a melhoria de fluxos.',
        base_salary: 0,
      },
      {
        title: 'Coordenador de RH',
        cbo_code: '1421-05',
        description: 'Coordena e lidera projetos de gestão de pessoas, recrutamento, desenvolvimento organizacional e cultura, atuando como parceiro estratégico das lideranças.',
        base_salary: 0,
      },

      // --- FINANCEIRO & COMPLIANCE ---
      {
        title: 'Analista Financeiro',
        cbo_code: '2525-45',
        description: 'Realiza atividades de contas a pagar/receber, conciliação, fluxo de caixa e análise orçamentária, oferecendo suporte estratégico para a tomada de decisão financeira.',
        base_salary: 0,
      },
      {
        title: 'Analista de Compliance',
        cbo_code: '1421-25',
        description: 'Garante a aderência às normas legais e políticas internas, atuando na mitigação de riscos, prevenção a fraudes (KYC) e suporte a auditorias.',
        base_salary: 0,
      },
      {
        title: 'Gerente Financeiro',
        cbo_code: '1421-25',
        description: 'Liderança estratégica da área financeira, responsável pelo planejamento, governança, análise de investimentos e sustentabilidade econômica do negócio.',
        base_salary: 0,
      },

      // --- MARKETING & CRIAÇÃO ---
      {
        title: 'Analista de Marketing Digital',
        cbo_code: '2123-10',
        description: 'Planeja e executa estratégias digitais, gestão de redes sociais, SEO, mídia paga e análise de performance para fortalecimento da marca e conversão.',
        base_salary: 0,
      },
      {
        title: 'Gestor de Tráfego',
        cbo_code: '1423-35',
        description: 'Especialista em planejamento e otimização de campanhas pagas, focado em maximizar a geração de leads e o ROI de mídia.',
        base_salary: 0,
      },
      {
        title: 'Videomaker',
        cbo_code: '2614-15',
        description: 'Responsável pela produção audiovisual completa, desde a captação e roteirização até a edição final e storytelling visual.',
        base_salary: 0,
      },
      {
        title: 'Diretor de Criação',
        cbo_code: '2611-40',
        description: 'Lidera a identidade visual e criativa da marca, supervisionando projetos de branding e garantindo inovação em todas as peças de comunicação.',
        base_salary: 0,
      },

      // --- SUCESSO DO CLIENTE & SUPORTE ---
      {
        title: 'Customer Success',
        cbo_code: '1423-60',
        description: 'Gerencia a jornada do cliente (sellers), focando em engajamento, retenção, ativação na plataforma e consultoria para crescimento mútuo.',
        base_salary: 0,
      },
      {
        title: 'Analista de Atendimento e Reembolsos',
        cbo_code: '4201-05',
        description: 'Atua no suporte direto ao cliente, resolução de disputas e gestão de processos de reembolso, buscando eficiência operacional e satisfação do usuário.',
        base_salary: 0,
      },
      {
        title: 'Suporte Técnico',
        cbo_code: '4223-15',
        description: 'Responsável por solucionar problemas técnicos e incidentes na plataforma, garantindo estabilidade e performance para os usuários.',
        base_salary: 0,
      },

      // --- COMERCIAL & VENDAS ---
      {
        title: 'Executivo Comercial',
        cbo_code: '5201-10',
        description: 'Atua no ciclo completo de vendas, desde a prospecção até o fechamento de contas Mid-Market e Enterprise, realizando negociações consultivas complexas.',
        base_salary: 0,
      },
      {
        title: 'SDR (Sales Development Representative)',
        cbo_code: '3541-25',
        description: 'Especialista em prospecção e qualificação de leads, mapeando dores e preparando oportunidades para o time de fechamento.',
        base_salary: 0,
      },
      {
        title: 'Supervisor Comercial',
        cbo_code: '5201-10',
        description: 'Coordena as operações comerciais locais, monitorando metas, orientando a equipe e garantindo a excelência nos processos de vendas.',
        base_salary: 0,
      },

      // --- TECNOLOGIA ---
      {
        title: 'Software Engineer',
        cbo_code: '2124-05',
        description: 'Desenvolve, mantém e arquitetura soluções de software escaláveis, garantindo performance, segurança e qualidade de código.',
        base_salary: 0,
      },
      {
        title: 'DevOps Engineer',
        cbo_code: '2123-10',
        description: 'Responsável pela automação de infraestrutura, pipelines de CI/CD, monitoramento e alta disponibilidade dos sistemas.',
        base_salary: 0,
      },
      {
        title: 'Team Leader / Tech Lead',
        cbo_code: '1425-35',
        description: 'Lidera squads multidisciplinares, removendo impedimentos, orientando tecnicamente a equipe e alinhando entregas aos objetivos de negócio.',
        base_salary: 0,
      },
      {
        title: 'Data Analyst',
        cbo_code: '2124-20',
        description: 'Transforma grandes volumes de dados em insights estratégicos por meio de dashboards, relatórios e governança de informações.',
        base_salary: 0,
      },

      // --- ADMINISTRATIVO & OPERACIONAL ---
      {
        title: 'Assistente Administrativo',
        cbo_code: '4110-10',
        description: 'Gerencia rotinas administrativas, organização de documentos e suporte aos diversos departamentos da empresa.',
        base_salary: 0,
      },
      {
        title: 'Auxiliar de Limpeza',
        cbo_code: '5143-20',
        description: 'Zela pela higienização, conservação e organização de todos os ambientes da empresa.',
        base_salary: 0,
      }
    ];

    for (const position of defaultPositions) {
      try {
        await this.jobPositionService.createWithAccountId(position, accountId);
      } catch (err) {
        this.logger.warn(`Cargo "${position.title}" já existe ou erro ao criar: ${err.message}`);
      }
    }
  }
}
