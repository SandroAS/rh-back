import { Controller, Post, Body, UseGuards, Get, Query, Param, HttpCode, HttpStatus, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { SectorsService } from './sectors.service';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { CreateSectorDto } from './dtos/create-sector.dto';
import { UpdateSectorDto } from './dtos/update-sector.dto';
import { SectorResponseDto } from './dtos/sector-response.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { SectorPaginationResponseDto } from './dtos/sector-pagination-response.dto';

@Controller('sectors')
@UseGuards(JwtAuthGuard)
export class SectorsController {
  constructor(private readonly service: SectorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateSectorDto,
    @AccountId() account_id: number
  ): Promise<SectorResponseDto> {
    const sector = await this.service.createWithAccountId(dto, account_id);
    return new SectorResponseDto(sector);
  }

  @Get()
  async findAll(@AccountId() account_id: number): Promise<SectorResponseDto[]> {
    return (await this.service.findAllWithAccountId(account_id)).map(x => new SectorResponseDto(x));
  }

  @Get('pagination')
  async findAndPaginate(
    @Query() pagination: PaginationDto,
    @AccountId() account_id: number
  ): Promise<SectorPaginationResponseDto> {
    const result = await this.service.findAndPaginateWithAccountId(pagination, account_id);
    return new SectorPaginationResponseDto(result);
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid') uuid: string,
    @AccountId() account_id: number
  ): Promise<SectorResponseDto> {
    const sector = await this.service.findOneWithAccountId(uuid, account_id, ['users']);
    return new SectorResponseDto(sector);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateSectorDto,
    @AccountId() account_id: number
  ): Promise<SectorResponseDto> {
    const updatedSector = await this.service.updateWithAccountId(uuid, dto, account_id);
    return new SectorResponseDto(updatedSector);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('uuid') uuid: string,
    @AccountId() account_id: number
  ): Promise<void> {
    await this.service.removeWithAccountId(uuid, account_id);
  }
}