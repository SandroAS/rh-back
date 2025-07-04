import { OdontogramCategory } from '@/entities/odontogram-category.entity';
import { Repository } from 'typeorm';
import { CreateOdontogramCategoryDto } from './dtos/create-odontogram-category.dto';
import { UpdateOdontogramCategoryDto } from './dtos/update-odontogram-category.dto';
import { BaseService, PaginationResult } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';
export declare class OdontogramCategoriesService extends BaseService<OdontogramCategory> {
    private readonly odontogramCategoryRepository;
    constructor(odontogramCategoryRepository: Repository<OdontogramCategory>);
    createForAccountId(createDto: CreateOdontogramCategoryDto, accountId: number): Promise<OdontogramCategory>;
    findAllForAccountId(query: PaginationDto, accountId: number): Promise<PaginationResult<OdontogramCategory>>;
    findOneForAccountId(uuid: string, accountId: number): Promise<OdontogramCategory>;
    updateForAccountId(uuid: string, updateDto: UpdateOdontogramCategoryDto, accountId: number): Promise<OdontogramCategory>;
    removeForAccountId(uuid: string, accountId: number): Promise<boolean>;
}
