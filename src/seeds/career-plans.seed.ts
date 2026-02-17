import { Injectable, Logger } from '@nestjs/common';
import { JobPositionService } from '@/modules/job-positions/job-positions.service';
import { CareerPlansService } from '@/modules/career-plans/career-plans.service';
import { CreateCareerPlanDto } from '@/modules/career-plans/dtos/create-career-plan.dto';
import { ConflictException } from '@nestjs/common';

interface CareerPlanStep {
  jobTitle: string;
  order: number;
  careerPlanYName?: string;
}

interface CareerPlanDef {
  name: string;
  steps: CareerPlanStep[];
}

const CAREER_PLANS_DEFINITIONS: CareerPlanDef[] = [
  {
    name: 'Manager Career',
    steps: [
      { jobTitle: 'Team Leader', order: 0 },
      { jobTitle: 'Engineering Manager', order: 1 },
      { jobTitle: 'Head of Engineering', order: 2 },
      { jobTitle: 'CTO', order: 3 },
    ],
  },
  {
    name: 'Developer Career',
    steps: [
      { jobTitle: 'Developer', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Tech Lead', order: 1 },
      { jobTitle: 'Staff Software Engineer', order: 2 },
      { jobTitle: 'Principal Software Engineer', order: 3 },
    ],
  },
  {
    name: 'QA Career',
    steps: [
      { jobTitle: 'Quality Assurance Analyst', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'QA Lead', order: 1 },
      { jobTitle: 'Staff QA Engineer', order: 2 },
      { jobTitle: 'Principal QA Engineer', order: 3 },
    ],
  },
  {
    name: 'Product Career',
    steps: [
      { jobTitle: 'Product Owner', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Product Manager', order: 1 },
      { jobTitle: 'Group Product Manager', order: 2 },
      { jobTitle: 'Head of Product', order: 3 },
      { jobTitle: 'CPO', order: 4 },
    ],
  },
  {
    name: 'Ops Career',
    steps: [
      { jobTitle: 'DevOps Engineer', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'SRE', order: 1 },
    ],
  },
  {
    name: 'UX Career',
    steps: [
      { jobTitle: 'UX Analyst', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'UX Lead', order: 1 },
      { jobTitle: 'Staff UX Engineer', order: 2 },
      { jobTitle: 'Principal UX Engineer', order: 3 },
    ],
  },
  {
    name: 'RH Career',
    steps: [
      { jobTitle: 'Tech Recruiter', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Assistente de Departamento Pessoal', order: 1 },
      { jobTitle: 'Coordenador de RH', order: 2 },
      { jobTitle: 'Gerente de RH', order: 3 },
    ],
  },
  {
    name: 'Finance Career',
    steps: [
      { jobTitle: 'Assistente Financeiro', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Analista Financeiro', order: 1 },
      { jobTitle: 'Gerente Financeiro', order: 2 },
    ],
  },
  {
    name: 'Marketing Career',
    steps: [
      { jobTitle: 'Analista de Marketing Digital', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Coordenador de Marketing', order: 1 },
      { jobTitle: 'Diretor de Criação', order: 2 },
      { jobTitle: 'CMO', order: 3 },
    ],
  },
  {
    name: 'Sales Career',
    steps: [
      { jobTitle: 'Sales Development Representative (SDR)', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Consultor Comercial', order: 1 },
      { jobTitle: 'Supervisor Comercial', order: 2 },
      { jobTitle: 'Gerente Comercial', order: 3 },
    ],
  },
  {
    name: 'Customer Success & Support Career',
    steps: [
      { jobTitle: 'Suporte Técnico', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Analista de Atendimento e Reembolsos', order: 1 },
      { jobTitle: 'Supervisor de Atendimento ao Cliente', order: 2 },
      { jobTitle: 'Customer Success', order: 3 },
    ],
  },
  {
    name: 'Data Career',
    steps: [
      { jobTitle: 'Analista de Dados', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Data Analyst', order: 1 },
    ],
  },
  {
    name: 'Software Engineer Career',
    steps: [
      { jobTitle: 'Software Engineer', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Lead Software Engineer', order: 1 },
      { jobTitle: 'Software Architect', order: 2 },
    ],
  },
  {
    name: 'Administrative Career',
    steps: [
      { jobTitle: 'Assistente Administrativo', order: 0, careerPlanYName: 'Manager Career' },
      { jobTitle: 'Secretário Executivo', order: 1 },
      { jobTitle: 'Gerente Administrativo', order: 2 },
    ],
  },
  {
    name: 'Compliance Career',
    steps: [
      { jobTitle: 'Assistente de Compliance', order: 0, careerPlanYName: 'Manager Career' },
    ],
  },
];

@Injectable()
export class CareerPlansSeed {
  private readonly logger = new Logger(CareerPlansSeed.name);

  constructor(
    private readonly jobPositionService: JobPositionService,
    private readonly careerPlansService: CareerPlansService,
  ) {}

  async run(accountId: number): Promise<void> {
    this.logger.log(`Populando planos de carreira para conta ID: ${accountId}...`);

    const jobPositions = await this.jobPositionService.findAllWithAccountId(accountId);
    const titleToUuid = new Map<string, string>();
    for (const jp of jobPositions) {
      if (!titleToUuid.has(jp.title)) {
        titleToUuid.set(jp.title, jp.uuid);
      }
    }

    const nameToUuid = new Map<string, string>();

    for (const planDef of CAREER_PLANS_DEFINITIONS) {
      const careerPlanYUuids = nameToUuid;
      const items = planDef.steps.map((step) => {
        const jobUuid = titleToUuid.get(step.jobTitle);
        if (!jobUuid) {
          this.logger.warn(
            `Cargo "${step.jobTitle}" não encontrado na conta ${accountId}; plano "${planDef.name}" será criado sem este passo.`,
          );
          return null;
        }
        const careerPlanYUuid =
          step.careerPlanYName != null ? careerPlanYUuids.get(step.careerPlanYName) ?? null : null;
        return {
          job_position_uuid: jobUuid,
          order: step.order,
          career_plan_y_uuid: careerPlanYUuid ?? undefined,
        };
      }).filter((item): item is NonNullable<typeof item> => item !== null);

      if (items.length === 0) {
        this.logger.warn(`Nenhum cargo encontrado para plano "${planDef.name}"; pulando.`);
        continue;
      }

      const dto: CreateCareerPlanDto = {
        name: planDef.name,
        careerPlanJobPositions: items,
      };

      try {
        const created = await this.careerPlansService.createWithAccountId(dto, accountId);
        nameToUuid.set(planDef.name, created.uuid);
        this.logger.log(`Plano de carreira "${planDef.name}" criado.`);
      } catch (err) {
        if (err instanceof ConflictException) {
          this.logger.log(`Plano "${planDef.name}" já existe na conta; pulando.`);
          const existing = await this.careerPlansService
            .findAllWithAccountId(accountId)
            .then((plans) => plans.find((p) => p.name === planDef.name));
          if (existing) {
            nameToUuid.set(planDef.name, existing.uuid);
          }
        } else {
          throw err;
        }
      }
    }

    this.logger.log(`Planos de carreira finalizados para conta ID: ${accountId}.`);
  }
}
