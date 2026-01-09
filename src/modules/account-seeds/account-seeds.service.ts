import { Injectable, Logger } from '@nestjs/common';
import { JobPositionService } from '../job-positions/job-positions.service';
import { CreateJobPositionDto } from '../job-positions/dtos/create-job-position.dto';
import { JobPositionsLevelsGroupsService } from '../job-positions-levels-groups/job-positions-levels-groups.service';
import { User } from '@/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SectorsService } from '../sectors/sectors.service';

@Injectable()
export class AccountSeedsService {
  private readonly logger = new Logger(AccountSeedsService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jobPositionService: JobPositionService,
    private readonly jobPositionsLevelsGroupsService: JobPositionsLevelsGroupsService,
    private readonly sectorsService: SectorsService,
  ) {}

  /**
   * Método principal para rodar todos os seeds de uma conta
   * @param accountId ID da conta
   * @param adminId ID do admin
   * @returns ID do grupo principal
   */
  async runDefaultSeeds(accountId: number, adminId: number) {
    const user = await this.usersService.findOne(adminId);
    this.logger.log(`Iniciando população de dados para a conta ID: ${accountId}...`);

    try {
      await this.seedSectors(accountId);
      const defaultGroupId = await this.seedJobLevelsGroups(accountId, user);
      await this.seedJobPositions(accountId, defaultGroupId);
      
      this.logger.log(`Seed completo para a conta ID: ${accountId}.`);
    } catch (error) {
      this.logger.error(`Erro crítico durante o seed: ${error.message}`);
    }
  }

  private async seedSectors(accountId: number) {
    this.logger.log(`Populando setores...`);

    const defaultSectors = [
      { name: 'RH' },
      { name: 'Compliance e Risco' },
      { name: 'Financeiro' },
      { name: 'Marketing' },
      { name: 'Administrativo' },
      { name: 'Facilities' },
      { name: 'Comercial' },
      { name: 'Tecnologia' },
      { name: 'Presidência' },
      { name: 'Operações' },
      { name: 'Produto' },
      { name: 'Jurídico' },
      { name: 'Vendas (SDR)' },
    ];

    for (const sector of defaultSectors) {
      try {
        const existing = await this.sectorsService.findAllWithAccountId(accountId);
        if (!existing.some(s => s.name.toLowerCase() === sector.name.toLowerCase())) {
          await this.sectorsService.createWithAccountId(sector as any, accountId);
          this.logger.log(`Setor "${sector.name}" criado.`);
        }
      } catch (err) {
        this.logger.warn(`Erro ao criar setor "${sector.name}": ${err.message}`);
      }
    }
  }

  /**
   * Cria os grupos e retorna o ID do grupo principal (Jr..Pl..Sr Níveis)
   */
  private async seedJobLevelsGroups(accountId: number, user: User): Promise<number | null> {
    this.logger.log(`Populando grupos de níveis de cargos...`);
    let mainGroupId: number | null = null;

    const defaultGroups = [
      {
        name: 'Jr..Pl..Sr',
        jobPositionsLevels: [
          { name: 'Jr', salary: 3000 },
          { name: 'Pl', salary: 5500 },
          { name: 'Sr', salary: 9000 },
        ]
      },
      {
        name: 'Jr..Pl..Sr Níveis',
        jobPositionsLevels: [
          { name: 'Júnior I', salary: 3000 },
          { name: 'Júnior II', salary: 4000 },
          { name: 'Júnior III', salary: 5000 },
          { name: 'Pleno I', salary: 6000 },
          { name: 'Pleno II', salary: 7000 },
          { name: 'Pleno III', salary: 8000 },
          { name: 'Sênior I', salary: 9000 },
          { name: 'Sênior II', salary: 10000 },
          { name: 'Sênior III', salary: 11000 },
        ]
      },
      {
        name: 'Níveis Estágio',
        jobPositionsLevels: [
          { name: 'Estágio Nível 1', salary: 1200 },
          { name: 'Estágio Nível 2', salary: 1500 },
          { name: 'Estágio Graduação Último Ano', salary: 1800 },
        ]
      }
    ];

    for (const groupDto of defaultGroups) {
      try {
        const existingGroups = await this.jobPositionsLevelsGroupsService.findAllWithAccountId(accountId);
        let group = existingGroups.find(g => g.name === groupDto.name);

        if (!group) {
          group = await this.jobPositionsLevelsGroupsService.createWithAccountId(groupDto as any, accountId, user);
          this.logger.log(`Grupo "${groupDto.name}" criado com sucesso.`);
        }

        if (group.name === 'Jr..Pl..Sr Níveis') {
          mainGroupId = group.id;
        }
      } catch (err) {
        this.logger.warn(`Erro ao processar grupo "${groupDto.name}": ${err.message}`);
      }
    }

    return mainGroupId;
  }

  private async seedJobPositions(accountId: number, defaultGroupId: number | null) {
    this.logger.log(`Populando cargos vinculados ao grupo ID: ${defaultGroupId}...`);

    const defaultPositions: CreateJobPositionDto[] = [
      // --- RECURSOS HUMANOS ---
      { title: 'Tech Recruiter', cbo_code: '2524-05', base_salary: 0, description: 'Especialista em recrutamento e seleção para perfis técnicos.' },
      { title: 'Assistente de Departamento Pessoal', cbo_code: '4110-30', base_salary: 0, description: 'Suporte em rotinas de admissão, demissão e folha.' },
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

    for (const positionDto of defaultPositions) {
      try {
        const finalDto: CreateJobPositionDto = {
          ...positionDto,
          job_positions_levels_group_id: defaultGroupId,
        } as CreateJobPositionDto;

        await this.jobPositionService.createWithAccountId(finalDto, accountId);
      } catch (err) {
        if (!err.message.includes('already exists')) {
          this.logger.warn(`Erro ao criar cargo "${positionDto.title}": ${err.message}`);
        }
      }
    }
  }
}
