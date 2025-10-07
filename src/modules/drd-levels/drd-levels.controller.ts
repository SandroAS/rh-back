// src/drd-levels/drd-levels.controller.ts

import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { DrdLevelsService } from './drd-levels.service';
import { DRDLevel } from '@/entities/drd-level.entity';
import { AccountId } from '@/common/decorators/account-id.decorator';

@Controller('drd-levels')
@UsePipes(new ValidationPipe({ transform: true }))
export class DrdLevelsController {
  constructor(private readonly drdLevelsService: DrdLevelsService) {}

  @Get()
  async findAll(@AccountId() accountId: number): Promise<DRDLevel[]> {
    return this.drdLevelsService.findAll({
      relations: ['drd'], 
      where: { drd: { account_id: accountId } as any },
    });
  }
}