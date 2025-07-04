import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OdontogramCategoriesService } from './odontogram-categories.service';
import { CreateOdontogramCategoryDto } from './dtos/create-odontogram-category.dto';
import { UpdateOdontogramCategoryDto } from './dtos/update-odontogram-category.dto';
import { AccountId } from '@/common/decorators/account-id.decorator';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@UseGuards(JwtAuthGuard)
@Controller('odontogram-categories')
export class OdontogramCategoriesController {
  constructor(private readonly odontogramCategoryService: OdontogramCategoriesService) {}

  @Post()
  async create(@Body() createOdontogramCategoryDto: CreateOdontogramCategoryDto, @AccountId() accountId: number) {
    return this.odontogramCategoryService.createForAccountId(createOdontogramCategoryDto, accountId);
  }

  @Get()
  async findAll(@Query() query: PaginationDto, @AccountId() accountId: number) {
    return this.odontogramCategoryService.findAllForAccountId(query, accountId);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @AccountId() accountId: number) {
    return this.odontogramCategoryService.findOneForAccountId(uuid, accountId);
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateOdontogramCategoryDto: UpdateOdontogramCategoryDto, @AccountId() accountId: number) {
    return this.odontogramCategoryService.updateForAccountId(uuid, updateOdontogramCategoryDto, accountId);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @AccountId() accountId: number) {
    return this.odontogramCategoryService.removeForAccountId(uuid, accountId);
  }
}