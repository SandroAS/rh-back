import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SectorsSeed } from '@/seeds/sectors.seed';
import { JobLevelsGroupsSeed } from '@/seeds/job-levels-groups.seed';
import { JobPositionsSeed } from '@/seeds/job-positions.seed';
import { DRDsSeed } from '@/seeds/drds.seed';
import { EvaluationSeeder } from '@/seeds/evaluation.seed';
import { CareerPlansSeed } from '@/seeds/career-plans.seed';

@Injectable()
export class AccountSeedsService {
  private readonly logger = new Logger(AccountSeedsService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly sectorsSeed: SectorsSeed,
    private readonly jobLevelsGroupsSeed: JobLevelsGroupsSeed,
    private readonly jobPositionsSeed: JobPositionsSeed,
    private readonly careerPlansSeed: CareerPlansSeed,
    private readonly drdsSeed: DRDsSeed,
    private readonly evaluationSeeder: EvaluationSeeder,
  ) {}

  /**
   * Método principal para rodar todos os seeds de uma conta.
   * Este método orquestra a execução de seeders menores e especializados.
   * * @param accountId ID da conta alvo
   * @param adminId ID do usuário administrador que está disparando a ação
   */
  async runDefaultSeeds(accountId: number, adminId: number): Promise<void> {
    const user = await this.usersService.findOne(adminId);

    if (!user) {
      this.logger.error(`Seed cancelado: Usuário admin ID ${adminId} não encontrado.`);
      throw new NotFoundException('Usuário não encontrado ao tentar rodar seeds da conta.');
    }

    this.logger.log(`Iniciando população de dados para a conta ID: ${accountId}...`);

    try {
      await this.sectorsSeed.run(accountId);

      const defaultGroupId = await this.jobLevelsGroupsSeed.run(accountId, user);

      await this.jobPositionsSeed.run(accountId, defaultGroupId);

      await this.careerPlansSeed.run(accountId);

      await this.drdsSeed.seed(accountId, user);

      await this.evaluationSeeder.run(accountId, user);
      
      this.logger.log(`Seed de setup inicial completo com sucesso para a conta ID: ${accountId}.`);
    } catch (error) {
      this.logger.error(`Erro crítico durante a execução dos seeds: ${error.message}`);
    }
  }
}
