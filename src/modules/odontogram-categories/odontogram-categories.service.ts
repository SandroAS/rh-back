import { OdontogramCategory } from '@/entities/odontogram-category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOdontogramCategoryDto } from './dtos/create-odontogram-category.dto';
import { UpdateOdontogramCategoryDto } from './dtos/update-odontogram-category.dto';
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';


@Injectable()
export class OdontogramCategoriesService extends BaseService<OdontogramCategory> {
  constructor(
    @InjectRepository(OdontogramCategory)
    private readonly odontogramCategoryRepository: Repository<OdontogramCategory>,
  ) {
    super(odontogramCategoryRepository);
  }

  async createForAccountId(createDto: CreateOdontogramCategoryDto, accountId: number): Promise<OdontogramCategory> {
    return super.create({ ...createDto, account_id: accountId });
  }

  async findAllForAccountId(query: PaginationDto, accountId: number): Promise<PaginationResult<OdontogramCategory>> {
    const searchColumns = ['name'];

    return super.findAndPaginate(query, searchColumns, (qb) => {
      qb.andWhere('entity.account_id = :accountId', { accountId });
    });
  }

  async findOneForAccountId(uuid: string, accountId: number): Promise<OdontogramCategory> {
    return await super.findByUuid(uuid, { where: { account_id: accountId } });
  }

  async updateForAccountId(uuid: string, updateDto: UpdateOdontogramCategoryDto, accountId: number): Promise<OdontogramCategory> {
    return await super.updateByUuid(uuid, updateDto, accountId);
  }

  async removeForAccountId(uuid: string, accountId: number): Promise<boolean> {
    return await super.removeByUuid(uuid, accountId);
  }
}
