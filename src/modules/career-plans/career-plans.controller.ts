import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { CareerPlansService } from './career-plans.service';
import { CreateCareerPlanDto } from './dtos/create-career-plan.dto';
import { UpdateCareerPlanDto } from './dtos/update-career-plan.dto';
import { CareerPlanResponseDto } from './dtos/career-plan-response.dto';
import { CareerPlanPaginationResponseDto } from './dtos/career-plan-pagination-response.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Controller('career-plans')
@UseGuards(JwtAuthGuard)
export class CareerPlansController {
  constructor(private readonly service: CareerPlansService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateCareerPlanDto,
    @AccountId() account_id: number,
  ): Promise<CareerPlanResponseDto> {
    const plan = await this.service.createWithAccountId(dto, account_id);
    return new CareerPlanResponseDto(plan);
  }

  @Get()
  async findAll(
    @AccountId() account_id: number,
  ): Promise<CareerPlanResponseDto[]> {
    const list = await this.service.findAllWithAccountId(account_id);
    return list.map((plan) => new CareerPlanResponseDto(plan));
  }

  @Get('pagination')
  async findAndPaginate(
    @Query() pagination: PaginationDto,
    @AccountId() account_id: number,
  ): Promise<CareerPlanPaginationResponseDto> {
    const result = await this.service.findAndPaginateWithAccountId(pagination, account_id);
    return new CareerPlanPaginationResponseDto(result);
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid') uuid: string,
    @AccountId() account_id: number,
  ): Promise<CareerPlanResponseDto> {
    const plan = await this.service.findOneByUuidOrThrow(uuid, account_id);
    return new CareerPlanResponseDto(plan);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateCareerPlanDto,
    @AccountId() account_id: number,
  ): Promise<CareerPlanResponseDto> {
    const plan = await this.service.updateByUuid(uuid, dto, account_id);
    return new CareerPlanResponseDto(plan);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('uuid') uuid: string,
    @AccountId() account_id: number,
  ): Promise<void> {
    await this.service.removeByUuid(uuid, account_id);
    return;
  }
}
