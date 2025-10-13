import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpCode, UseGuards, Request, Query, Put } from '@nestjs/common';
import { JobPositionService } from './job-positions.service';
import { CreateJobPositionDto } from './dtos/create-job-position.dto';
import { UpdateJobPositionDto } from './dtos/update-job-position.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import JobPositionResponseDto from './dtos/job-position-response.dto';
import { JobPositionsPaginationResponseDto } from './dtos/job-positions-pagination-response.dto';

@Controller('job-positions')
@UseGuards(JwtAuthGuard)
export class JobPositionController {
  constructor(private readonly jobPositionService: JobPositionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createJobPositionDto: CreateJobPositionDto, @AccountId() account_id: number): Promise<{ uuid: string }> {
    return await this.jobPositionService.createWithAccountId(createJobPositionDto, account_id);
  }

  @Get()
  async findAll(@AccountId() account_id: number): Promise<JobPositionResponseDto[]> {
    const jobPositions = await this.jobPositionService.findAllWithAccountId(account_id);
    return jobPositions.map(jobPosition => new JobPositionResponseDto(jobPosition));
  }

  @Get('pagination')
  async findAllAndPaginate(@Query() query: PaginationDto, @AccountId() account_id: number): Promise<JobPositionsPaginationResponseDto> {
    return new JobPositionsPaginationResponseDto(await this.jobPositionService.findAndPaginateWithAccountId(query, account_id));
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<JobPositionResponseDto> {
    return this.jobPositionService.findOneWithAccountId(uuid, account_id);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateJobPositionDto: UpdateJobPositionDto,
    @AccountId() account_id: number,
  ): Promise<JobPositionResponseDto> {
    return new JobPositionResponseDto(await this.jobPositionService.updateWithAccountId(uuid, updateJobPositionDto, account_id));
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<void> {
    return this.jobPositionService.removeWithAccountId(uuid, account_id);
  }
}
