import { RolesService } from './roles.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(pagination: PaginationDto): Promise<import("../../common/services/base.service").PaginationResult<any>>;
    findOne(id: number): Promise<import("../../entities/role.entity").Role>;
    assignPermissions(id: number, permissionIds: number[]): Promise<import("../../entities/role.entity").Role>;
}
