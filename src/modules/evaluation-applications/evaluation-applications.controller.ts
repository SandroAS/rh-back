import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Patch } from '@nestjs/common';
import { EvaluationApplicationsService } from './evaluation-applications.service';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { User } from '@/entities/user.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EvaluationApplicationResponseDto } from './dtos/evaluation-application-response.dto';
import { EvaluationApplicationPaginationResponseDto } from './dtos/evaluation-application-pagination-response.dto';
import { CreateEvaluationApplicationDto } from './dtos/create-evaluation-application.dto';
import { UpdateEvaluationApplicationDto } from './dtos/update-evaluation-application.dto';
import { SendEvaluationApplicationDto } from './dtos/send-evaluation-application.dto';
import { EvaluationApplicationFilterDto } from './dtos/metrics-evaluation-application.dto';

@Controller('evaluation-applications')
@UseGuards(JwtAuthGuard)
export class EvaluationApplicationsController {
  constructor(
    private readonly evaluationApplicationsService: EvaluationApplicationsService,
  ) {}

  @Post()
  async create(
    @Body() payloadDto: CreateEvaluationApplicationDto, 
    @AccountId() accountId: number, 
    @AuthUser() user: User
  ): Promise<EvaluationApplicationResponseDto[]> {
    const createds = await this.evaluationApplicationsService.createByAccountId(payloadDto, accountId, user);
    return createds.map(created => new EvaluationApplicationResponseDto(created));
  }

  @Get('pagination')
  async findAndPaginate(
    @Query() pagination: PaginationDto, 
    @AccountId() account_id: number
  ): Promise<EvaluationApplicationPaginationResponseDto> {
    const result = await this.evaluationApplicationsService.findAndPaginateByAccountId(pagination, account_id);
    return new EvaluationApplicationPaginationResponseDto(result);
  }

  @Get()
  async findAll(@AccountId() account_id: number): Promise<EvaluationApplicationResponseDto[]> {
    const applications = await this.evaluationApplicationsService.findAllWithAccountId(account_id);
    return applications.map(application => new EvaluationApplicationResponseDto(application));
  }

  @Patch('cancel/:uuid')
  async cancel(
    @Param('uuid') uuid: string,
    @AccountId() accountId: number,
  ): Promise<EvaluationApplicationResponseDto> {
    return new EvaluationApplicationResponseDto(await this.evaluationApplicationsService.cancel(uuid, accountId));
  }

  @Post('send/:uuid')
  async send(
    @Param('uuid') uuid: string,
    @Body() payloadDto: SendEvaluationApplicationDto,
    @AccountId() accountId: number,
  ): Promise<EvaluationApplicationResponseDto> {
    return new EvaluationApplicationResponseDto(await this.evaluationApplicationsService.send(uuid, payloadDto, accountId));
  }

  @Get('metrics')
  async findWithFiltersMetrics(
    @Query() filters: EvaluationApplicationFilterDto,
    @AccountId() accountId: number,
  ): Promise<EvaluationApplicationResponseDto[]> {
    const applications = await this.evaluationApplicationsService.findWithFiltersMetrics(filters, accountId);
    return applications.map(app => new EvaluationApplicationResponseDto(app));
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid') uuid: string, 
    @AccountId() account_id: number
  ): Promise<EvaluationApplicationResponseDto> {
    const application = await this.evaluationApplicationsService.findOneWithRelations(uuid, account_id);
    return new EvaluationApplicationResponseDto(application);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() payloadDto: UpdateEvaluationApplicationDto,
    @AccountId() accountId: number,
  ): Promise<EvaluationApplicationResponseDto> {
    return new EvaluationApplicationResponseDto(await this.evaluationApplicationsService.updateWithAccountId(uuid, payloadDto, accountId));
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @AccountId() accountId: number) {
    return this.evaluationApplicationsService.removeByUuid(uuid, accountId);
  }
}
