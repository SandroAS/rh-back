import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { JobPositionsLevelsService } from './job-positions-levels.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateJobPositionsLevelDto } from './dtos/create-job-positions-level.dto';
import { JobPositionsLevel } from '@/entities/job-position-level.entity';
import { UpdateJobPositionsLevelDto } from './dtos/update-job-positions-level.dto';

@Controller('job-positions-levels')
@UseGuards(JwtAuthGuard)
export class JobPositionsLevelsController {
  constructor(private readonly service: JobPositionsLevelsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateJobPositionsLevelDto, @AccountId() account_id: number): Promise<JobPositionsLevel> {
    return this.service.create(dto, account_id);
  }

  @Get()
  findAll(@AccountId() account_id: number): Promise<JobPositionsLevel[]> {
    return this.service.findAll(account_id);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<JobPositionsLevel> {
    return this.service.findOne(uuid, account_id);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateJobPositionsLevelDto,
    @AccountId() account_id: number,
  ): Promise<JobPositionsLevel> {
    return this.service.update(uuid, dto, account_id);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<void> {
    return this.service.remove(uuid, account_id);
  }
}
