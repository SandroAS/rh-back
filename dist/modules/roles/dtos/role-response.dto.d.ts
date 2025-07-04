import { Role } from '@/entities/role.entity';
import { PermissionResponseDto } from '@/modules/permissions/dtos/permission-response.dto';
export declare class RoleResponseDto {
    uuid: string;
    name: string;
    permissions: string[] | PermissionResponseDto[];
    constructor(partial: Partial<Role>);
}
