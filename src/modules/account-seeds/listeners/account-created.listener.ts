import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AccountSeedsService } from '../account-seeds.service';

@Injectable()
export class AccountCreatedListener {
  private readonly logger = new Logger(AccountCreatedListener.name);

  constructor(private readonly accountSeedsService: AccountSeedsService
  ) {}

  @OnEvent('account.created', { async: true })
  async handleAccountCreatedEvent(payload: { accountId: number; adminId: number; }) {
    this.logger.log(`Evento de conta criada recebido para ID: ${payload.accountId}`);
    
    try {
      await this.accountSeedsService.runDefaultSeeds(payload.accountId, payload.adminId);
      this.logger.log(`Seeds finalizados com sucesso para conta: ${payload.accountId}`);
    } catch (error) {
      this.logger.error(`Falha ao executar seeds para conta ${payload.accountId}: ${error.message}`);
    }
  }
}
