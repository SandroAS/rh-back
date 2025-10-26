import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { DrdsService } from './drds.service';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { User } from '@/entities/user.entity';
import { CreateDRDDto } from './dtos/create-drd.dto';
import { UpdateDRDDto } from './dtos/update-drd.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { DRDPaginationResponseDto } from './dtos/drd-pagination-response.dto';
import { DRDResponseDto } from './dtos/drd-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindOptionsRelations } from 'typeorm';
import { DRD } from '@/entities/drd.entity';


@Controller('drds')
@UseGuards(JwtAuthGuard)
export class DrdsController {
  constructor(private readonly drdsService: DrdsService) {}

  @Post()
  async create(@Body() createDrdDto: CreateDRDDto, @AccountId() accountId: number, @AuthUser() user: User): Promise<DRDResponseDto> {
    return new DRDResponseDto(await this.drdsService.createByAccountId(createDrdDto, accountId, user));
  }

  @Get('pagination')
  async findAndPaginate(@Query() pagination: PaginationDto, @AccountId() account_id: number): Promise<DRDPaginationResponseDto> {
    const result = await this.drdsService.findAndPaginateByAccountId(pagination, account_id);
    return new DRDPaginationResponseDto(result);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @AccountId() account_id: number): Promise<DRDResponseDto> {
    const relations: FindOptionsRelations<DRD> = {
      jobPosition: true,
      createdBy: true,
      levels: true,
      metrics: {
        minScores: { drdLevel: true, drdTopicItem: true, drdMetric: true }
      },
      topics: {
        drdTopicItems: {
          minScores: { drdLevel: true, drdTopicItem: true, drdMetric: true }
        }
      }
    };

    return new DRDResponseDto(await this.drdsService.findOne({ 
      where: { uuid, account_id }, 
      relations 
    }));
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateDrdDto: UpdateDRDDto,
    @AccountId() accountId: number,
    @AuthUser() user: User
  ): Promise<DRDResponseDto> {
    return new DRDResponseDto(await this.drdsService.updateByAccountId(uuid, updateDrdDto, accountId, user));
  }
  
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @AccountId() accountId: number) {
    return this.drdsService.removeByUuid(uuid, accountId);
  }
}
