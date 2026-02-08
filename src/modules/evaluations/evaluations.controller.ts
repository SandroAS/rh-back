import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { User } from '@/entities/user.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EvaluationResponseDto } from './dtos/evaluation-response.dto';
import { EvaluationPaginationResponseDto } from './dtos/evaluation-pagination-response.dto';
import { CreateEvaluationDto } from './dtos/create-evaluation.dto';
import { UpdateEvaluationDto } from './dtos/update-evaluation.dto';

@Controller('evaluations')
@UseGuards(JwtAuthGuard)
export class EvaluationsController {
  constructor(
    private readonly evaluationsService: EvaluationsService,
  ) {}

  @Post()
  async create(
    @Body() evaluationPayloadDto: CreateEvaluationDto, 
    @AccountId() accountId: number, 
    @AuthUser() user: User
  ): Promise<EvaluationResponseDto> {
    const createdEvaluation = await this.evaluationsService.createByAccountId(evaluationPayloadDto, accountId, user);
    return new EvaluationResponseDto(createdEvaluation);
  }

  @Get('pagination')
  async findAndPaginate(
    @Query() pagination: PaginationDto, 
    @AccountId() account_id: number
  ): Promise<EvaluationPaginationResponseDto> {
    const result = await this.evaluationsService.findAndPaginateByAccountId(pagination, account_id);
    return new EvaluationPaginationResponseDto(result);
  }

  @Get()
  async findAll(@AccountId() account_id: number): Promise<EvaluationResponseDto[]> {
    const evaluations = await this.evaluationsService.findAllWithAccountId(account_id);
    return evaluations.map(evaluation => new EvaluationResponseDto(evaluation));
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid') uuid: string, 
    @AccountId() account_id: number
  ): Promise<EvaluationResponseDto> {
    return new EvaluationResponseDto(await this.evaluationsService.findOneWithRelations(uuid, account_id));
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() evaluationPayloadDto: UpdateEvaluationDto,
    @AccountId() accountId: number,
  ): Promise<EvaluationResponseDto> {
    const updatedEvaluation = await this.evaluationsService.updateWithAccountId(uuid, evaluationPayloadDto, accountId);
    return new EvaluationResponseDto(updatedEvaluation);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @AccountId() accountId: number) {
    return this.evaluationsService.removeByUuid(uuid, accountId);
  }
}
