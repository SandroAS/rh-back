import { OdontogramCategoriesService } from './odontogram-categories.service';
import { CreateOdontogramCategoryDto } from './dtos/create-odontogram-category.dto';
import { UpdateOdontogramCategoryDto } from './dtos/update-odontogram-category.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
export declare class OdontogramCategoriesController {
    private readonly odontogramCategoryService;
    constructor(odontogramCategoryService: OdontogramCategoriesService);
    create(createOdontogramCategoryDto: CreateOdontogramCategoryDto, accountId: number): Promise<import("../../entities/odontogram-category.entity").OdontogramCategory>;
    findAll(query: PaginationDto, accountId: number): Promise<import("../../common/services/base.service").PaginationResult<import("../../entities/odontogram-category.entity").OdontogramCategory>>;
    findOne(uuid: string, accountId: number): Promise<import("../../entities/odontogram-category.entity").OdontogramCategory>;
    update(uuid: string, updateOdontogramCategoryDto: UpdateOdontogramCategoryDto, accountId: number): Promise<import("../../entities/odontogram-category.entity").OdontogramCategory>;
    remove(uuid: string, accountId: number): Promise<boolean>;
}
