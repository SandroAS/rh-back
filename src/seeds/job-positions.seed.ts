import { CreateJobPositionDto } from '@/modules/job-positions/dtos/create-job-position.dto';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { Injectable, Logger } from '@nestjs/common';
import { jobPositionDefinitions } from './jobPositionsData/job-positions-data-definition';

@Injectable()
export class JobPositionsSeed {
  private readonly logger = new Logger(JobPositionsSeed.name);

  constructor(private readonly jobPositionService: JobPositionService) {}

  async run(accountId: number, defaultGroupId: number | null) {
    if (!defaultGroupId) return;

    this.logger.log(`Populando cargos para conta ID: ${accountId}...`);

    const definitionsAsPositions: Partial<CreateJobPositionDto>[] = jobPositionDefinitions.map(d => ({
      title: d.title,
      cbo_code: d.cbo_code,
      base_salary: d.base_salary || 0,
      description: d.description,
    }));

    const genericPositions: Partial<CreateJobPositionDto>[] = [
      // --- RECURSOS HUMANOS ---
      { title: 'Coordenadora de RH', cbo_code: '1232-05', base_salary: 0, description: 'Coordenação estratégica da área de recursos humanos.' },

      // --- FINANCEIRO E COMPLIANCE ---
      { title: 'Analista Financeiro', cbo_code: '2522-10', base_salary: 0, description: 'Análise e planejamento de fluxo de caixa e contas.' },
      { title: 'Assistente de Compliance', cbo_code: '2522-10', base_salary: 0, description: 'Suporte na garantia de normas legais e regulamentares.' },
      { title: 'Assistente Financeiro', cbo_code: '4110-10', base_salary: 0, description: 'Rotinas operacionais financeiras e contas a pagar/receber.' },
      { title: 'Gerente Financeiro', cbo_code: '1231-10', base_salary: 0, description: 'Gestão estratégica das finanças corporativas.' },
      { title: 'Assistente de Cobranças', cbo_code: '4110-30', base_salary: 0, description: 'Atua na recuperação de crédito e negociação de débitos.' },

      // --- MARKETING E CRIAÇÃO ---
      { title: 'Analista de Marketing Digital', cbo_code: '2531-15', base_salary: 0, description: 'Estratégias de marketing em canais digitais.' },
      { title: 'Coordenadora de Marketing', cbo_code: '1233-05', base_salary: 0, description: 'Coordenação da equipe e estratégias de marketing.' },
      { title: 'Diretor de Criação', cbo_code: '1233-10', base_salary: 0, description: 'Liderança criativa e direção de arte.' },
      { title: 'Gestor de Tráfego', cbo_code: '2531-15', base_salary: 0, description: 'Gestão de campanhas de anúncios pagos.' },
      { title: 'Videomaker', cbo_code: '3744-20', base_salary: 0, description: 'Produção e edição de conteúdo audiovisual.' },
      { title: 'CMO', cbo_code: '1233-05', base_salary: 0, description: 'Chief Marketing Officer - Direção executiva de marketing.' },

      // --- ATENDIMENTO E CS ---
      { title: 'Analista de Atendimento e Reembolsos', cbo_code: '4110-10', base_salary: 0, description: 'Suporte ao cliente e gestão de processos de reembolso.' },
      { title: 'Analista de Relacionamento e Reputação', cbo_code: '2531-05', base_salary: 0, description: 'Gestão da imagem da empresa perante os clientes.' },
      { title: 'Customer Success', cbo_code: '', base_salary: 0, description: 'Garante o sucesso e retenção do cliente com o produto.' },
      { title: 'Supervisor de Atendimento ao Cliente', cbo_code: '1423-15', base_salary: 0, description: 'Liderança operacional do time de suporte e atendimento.' },

      // --- ADMINISTRATIVO ---
      { title: 'Suporte Técnico', cbo_code: '3172-10', base_salary: 0, description: 'Suporte de TI interno e manutenção de ferramentas.' },
      { title: 'Assistente Administrativo', cbo_code: '4110-10', base_salary: 0, description: 'Apoio nas rotinas administrativas diárias.' },
      { title: 'Gerente Administrativo', cbo_code: '1210-05', base_salary: 0, description: 'Gestão de processos administrativos e infraestrutura.' },
      { title: 'Auxiliar de Limpeza', cbo_code: '5143-20', base_salary: 0, description: 'Manutenção e higienização das dependências.' },
      { title: 'Secretaria Executiva', cbo_code: '2523-05', base_salary: 0, description: 'Apoio direto à diretoria e gestão de agendas.' },

      // --- COMERCIAL ---
      { title: 'Executivo Comercial', cbo_code: '2531-15', base_salary: 0, description: 'Fechamento de novos negócios e parcerias.' },
      { title: 'SDR', cbo_code: '', base_salary: 0, description: 'Sales Development Representative - Qualificação de leads.' },
      { title: 'Supervisor Comercial', cbo_code: '1423-15', base_salary: 0, description: 'Gestão de metas e equipe de vendas.' },
      { title: 'Consultor Comercial', cbo_code: '3541-20', base_salary: 0, description: 'Consultoria e vendas consultivas de serviços.' },

      // --- ENGENHARIA E DADOS (TECH) ---
      { title: 'Data Analyst', cbo_code: '2112-10', base_salary: 0, description: 'Análise estatística e modelagem de dados.' },
      { title: 'Team Leader', cbo_code: '', base_salary: 0, description: 'Liderança de squad e gestão de pessoas em tecnologia.' },
      { title: 'DevOps Engineer', cbo_code: '2124-05', base_salary: 0, description: 'Infraestrutura, CI/CD e automação.' },
      { title: 'Software Engineer', cbo_code: '2124-05', base_salary: 0, description: 'Desenvolvimento de software e arquitetura.' },
      { title: 'Lead Software Engineer', cbo_code: '', base_salary: 0, description: 'Liderança técnica sênior em engenharia de software.' },
      { title: 'Tech Lead', cbo_code: '', base_salary: 0, description: 'Referência técnica para o time de desenvolvimento.' },
      { title: 'Quality Assurance Analyst', cbo_code: '2124-20', base_salary: 0, description: 'Garantia de qualidade e testes de software.' },
      { title: 'Product Owner', cbo_code: '', base_salary: 0, description: 'Gestão do backlog e visão de produto.' },
      { title: 'Software Architect', cbo_code: '2124-05', base_salary: 0, description: 'Desenho de arquiteturas escaláveis de software.' },
      { title: 'Ux Analyst', cbo_code: '2124-05', base_salary: 0, description: 'Análise de experiência do usuário.' },
      { title: 'UX Lead', cbo_code: '', base_salary: 0, description: 'Liderança de design e experiência do usuário.' },
      { title: 'Developer', cbo_code: '2124-05', base_salary: 0, description: 'Desenvolvimento e manutenção de aplicações.' },

      // --- PROCESSOS E OPERAÇÕES ---
      { title: 'Analista de Operações e Comercial', cbo_code: '2521-05', base_salary: 0, description: 'Otimização de fluxos entre as áreas comercial e operacional.' },
      { title: 'Analista de Processos', cbo_code: '2521-05', base_salary: 0, description: 'Mapeamento e melhoria de processos internos.' },
      { title: 'Analista de Dados', cbo_code: '2112-10', base_salary: 0, description: 'Processamento e visualização estratégica de dados.' },
    ];

    const allPositions = [...definitionsAsPositions, ...genericPositions];

    for (const positionDto of allPositions) {
      try {
        const finalDto = {
          ...positionDto,
          job_positions_levels_group_id: defaultGroupId,
          base_salary: positionDto.base_salary || 0,
        } as CreateJobPositionDto;

        await this.jobPositionService.createWithAccountId(finalDto, accountId);
      } catch (err) {
        if (!err.message.includes('already exists') && !err.message.includes('unique constraint')) {
          this.logger.warn(`Erro no cargo "${positionDto.title}": ${err.message}`);
        }
      }
    }
  }
}
