import { EntityManager, Repository } from 'typeorm';
import { Role } from '@/entities/role.entity';
import { PermissionsService } from '../permissions/permissions.service';
import { RolesTypes } from './dtos/roles-types.dto';
import { PaginationResult } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';
export declare class RolesService {
    private readonly roleRepository;
    private readonly permissionsService;
    constructor(roleRepository: Repository<Role>, permissionsService: PermissionsService);
    findAll(): Promise<{
        permissions: string[];
        id: number;
        uuid: string;
        name: string;
        users: import("../../entities/user.entity").User[];
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllWithPaginationOptimized(pagination: PaginationDto): Promise<PaginationResult<any>>;
    findByName(name: RolesTypes, manager?: EntityManager): Promise<Role | undefined>;
    findOne(id: number): Promise<Role>;
    assignPermissions(roleId: number, permissionIds: number[]): Promise<Role>;
}
