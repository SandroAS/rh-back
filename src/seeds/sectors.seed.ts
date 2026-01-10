import { SectorsService } from '@/modules/sectors/sectors.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SectorsSeed {
  private readonly logger = new Logger(SectorsSeed.name);

  constructor(private readonly sectorsService: SectorsService) {}

  async run(accountId: number) {
    this.logger.log(`Populando setores para conta ID: ${accountId}...`);

    const defaultSectors = [
      { name: 'RH' }, { name: 'Compliance e Risco' }, { name: 'Financeiro' },
      { name: 'Marketing' }, { name: 'Administrativo' }, { name: 'Facilities' },
      { name: 'Comercial' }, { name: 'Tecnologia' }, { name: 'Presidência' },
      { name: 'Operações' }, { name: 'Produto' }, { name: 'Jurídico' },
      { name: 'Vendas (SDR)' },
    ];

    for (const sector of defaultSectors) {
      try {
        const existing = await this.sectorsService.findAllWithAccountId(accountId);
        if (!existing.some(s => s.name.toLowerCase() === sector.name.toLowerCase())) {
          await this.sectorsService.createWithAccountId(sector as any, accountId);
        }
      } catch (err) {
        this.logger.warn(`Erro ao criar setor "${sector.name}": ${err.message}`);
      }
    }
  }
}
