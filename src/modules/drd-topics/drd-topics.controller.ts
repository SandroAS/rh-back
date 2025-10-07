import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { DrdTopicsService } from './drd-topics.service';
import { DRDTopic } from '@/entities/drd-topic.entity';
import { AccountId } from '@/common/decorators/account-id.decorator';

@Controller('drd-topics')
@UsePipes(new ValidationPipe({ transform: true }))
export class DrdTopicsController {
  constructor(private readonly drdTopicsService: DrdTopicsService) {}

  @Get(':drdUuid')
  async findTopicsByDrdUuid(
    @Param('drdUuid') drdUuid: string,
    @AccountId() accountId: number,
  ): Promise<DRDTopic[]> {
    return this.drdTopicsService.findAll({
      relations: ['drd', 'items'],
      where: { drd: { uuid: drdUuid, account_id: accountId } as any },
    });
  }
}
