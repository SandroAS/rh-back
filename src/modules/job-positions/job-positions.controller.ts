import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Request } from '@nestjs/common';
import { JobPositionService } from './job-positions.service';
import { CreateJobPositionDto } from './dtos/create-job-position.dto';
import { UpdateJobPositionDto } from './dtos/update-job-position.dto';
import { JobPosition } from '@/entities/job-position.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountId } from '@/common/decorators/account-id.decorator';

@Controller('job-positions')
@UseGuards(JwtAuthGuard)
export class JobPositionController {
  constructor(private readonly jobPositionService: JobPositionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createJobPositionDto: CreateJobPositionDto, @AccountId() account_id: number): Promise<JobPosition> {
    return this.jobPositionService.create(createJobPositionDto, account_id);
  }

  @Get()
  findAll(@AccountId() account_id: number): Promise<JobPosition[]> {
    return this.jobPositionService.findAll(account_id);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<JobPosition> {
    return this.jobPositionService.findOne(uuid, account_id);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateJobPositionDto: UpdateJobPositionDto,
    @AccountId() account_id: number,
  ): Promise<JobPosition> {
    return this.jobPositionService.update(uuid, updateJobPositionDto, account_id);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<void> {
    return this.jobPositionService.remove(uuid, account_id);
  }
}
