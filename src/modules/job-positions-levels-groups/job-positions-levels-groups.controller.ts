import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpCode, UseGuards, Query, Put } from '@nestjs/common';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JobPositionsLevelsGroupsService } from './job-positions-levels-groups.service';
import { CreateJobPositionsLevelsGroupDto } from './dtos/create-job-positions-levels-group.dto';
import { JobPositionsLevelsGroup } from '@/entities/job-positions-levels-group.entity';
import { UpdateJobPositionsLevelsGroupDto } from './dtos/update-job-positions-levels-group.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { JobPositionsLevelsGroupsPaginationResponseDto } from './dtos/job-positions-levels-groups-pagination-response.dto';
import JobPositionLevelsGroupResponseDto from './dtos/job-positions-levels-group-response.dto';

@Controller('job-positions-levels-groups')
@UseGuards(JwtAuthGuard)
export class JobPositionsLevelsGroupsController {
  constructor(private readonly service: JobPositionsLevelsGroupsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateJobPositionsLevelsGroupDto, @AccountId() account_id: number): Promise<JobPositionLevelsGroupResponseDto> {
    return new JobPositionLevelsGroupResponseDto(await this.service.createWithAccountId(dto, account_id));
  }

  @Get()
  findAll(@AccountId() account_id: number): Promise<JobPositionsLevelsGroup[]> {
    return this.service.findAllWithAccountId(account_id);
  }

  @Get('pagination')
  async findAllAndPaginate(@Query() query: PaginationDto, @AccountId() account_id: number): Promise<JobPositionsLevelsGroupsPaginationResponseDto> {
    return new JobPositionsLevelsGroupsPaginationResponseDto(await this.service.findAndPaginateWithAccountId(query, account_id));
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<JobPositionsLevelsGroup> {
    return this.service.findOneWithAccountId(uuid, account_id);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateJobPositionsLevelsGroupDto,
    @AccountId() account_id: number,
  ): Promise<JobPositionLevelsGroupResponseDto> {
    return new JobPositionLevelsGroupResponseDto(await this.service.updateWithAccountId(uuid, dto, account_id));
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<void> {
    return this.service.removeWithAccountId(uuid, account_id);
  }
}
