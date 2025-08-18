import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JobPositionsLevelsGroupsService } from './job-positions-levels-groups.service';
import { CreateJobPositionsLevelsGroupDto } from './dtos/create-job-positions-levels-group.dto';
import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';
import { UpdateJobPositionsLevelsGroupDto } from './dtos/update-job-positions-levels-group.dto';

@Controller('job-positions-levels-groups')
@UseGuards(JwtAuthGuard)
export class JobPositionsLevelsGroupsController {
  constructor(private readonly service: JobPositionsLevelsGroupsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateJobPositionsLevelsGroupDto, @AccountId() account_id: number): Promise<JobPositionsLevelsGroup> {
    return this.service.create(dto, account_id);
  }

  @Get()
  findAll(@AccountId() account_id: number): Promise<JobPositionsLevelsGroup[]> {
    return this.service.findAll(account_id);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<JobPositionsLevelsGroup> {
    return this.service.findOne(uuid, account_id);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateJobPositionsLevelsGroupDto,
    @AccountId() account_id: number,
  ): Promise<JobPositionsLevelsGroup> {
    return this.service.update(uuid, dto, account_id);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<void> {
    return this.service.remove(uuid, account_id);
  }
}
