import { Injectable, Logger } from '@nestjs/common';
import { JobPositionService } from '../job-positions/job-positions.service';
import { CreateJobPositionDto } from '../job-positions/dtos/create-job-position.dto';

@Injectable()
export class AccountSeedsService {
  private readonly logger = new Logger(AccountSeedsService.name);

  constructor(
    private readonly jobPositionService: JobPositionService,
  ) {}

  /**
   * Método principal chamado pelo Listener após a criação de uma conta.
   * Centraliza a chamada de todos os seeds necessários.
   */
  async runDefaultSeeds(accountId: number) {
    this.logger.log(`Populando dados iniciais para a conta ID: ${accountId}...`);

    try {
      // 1. Cargos (Job Positions)
      await this.seedJobPositions(accountId);
      
      // 2. Futuros seeds podem ser adicionados aqui:
      // await this.seedSectors(accountId);
      // await this.seedLevels(accountId);
      
      this.logger.log(`Seed finalizado com sucesso para conta ID: ${accountId}`);
    } catch (error) {
      this.logger.error(`Erro crítico durante o processamento do seed: ${error.message}`);
      // Lançar o erro permite que o Listener capture e logue a falha
      throw error;
    }
  }

  private async seedJobPositions(accountId: number) {
    const defaultPositions: CreateJobPositionDto[] = [
      {
        title: 'Analista de DHO',
        cbo_code: '2524-05',
        description: 'Responsável pelos subsistemas de Desenvolvimento Humano e Organizacional. Atua desde o apoio operacional em treinamentos e ações de engajamento, até a execução de programas de carreira, retenção e fortalecimento da cultura.',
        base_salary: 0,
      },
      {
        title: 'Tech Recruiter',
        cbo_code: '2524-10',
        description: 'Especialista em recrutamento e seleção de perfis tecnológicos. Responsável por todo o ciclo de atração de talentos.',
        base_salary: 0,
      }
    ];

    for (const position of defaultPositions) {
      try {
        // Assume-se que o JobPositionService tem o método createWithAccountId
        await this.jobPositionService.createWithAccountId(position, accountId);
        this.logger.debug(`Cargo padrão criado: ${position.title} para conta ${accountId}`);
      } catch (err) {
        this.logger.warn(`Aviso: Não foi possível criar o cargo ${position.title}: ${err.message}`);
      }
    }
  }
}