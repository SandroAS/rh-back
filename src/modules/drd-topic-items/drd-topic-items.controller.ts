import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { DrdTopicItemsService } from './drd-topic-items.service';
import { DRDTopicItem } from '@/entities/drd-topic-item.entity';
import { AccountId } from '@/common/decorators/account-id.decorator';

@Controller('drd-topic-items')
@UsePipes(new ValidationPipe({ transform: true }))
export class DrdTopicItemsController {
  constructor(private readonly drdTopicItemsService: DrdTopicItemsService) {}

  @Get(':id')
  async findOneById(@Param('id') id: number, @AccountId() accountId: number): Promise<DRDTopicItem> {
    const item = await this.drdTopicItemsService.findOne({
      where: { id: id as any, drdTopic: { drd: { account_id: accountId } } as any },
      relations: ['drdTopic', 'drdTopic.drd'],
    });

    if (!item) {
        throw new Error('Item de Tópico não encontrado ou sem permissão.');
    }
    return item;
  }
}
