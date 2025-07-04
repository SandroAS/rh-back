import { Permission } from '@/entities/permission.entity';
export declare class PermissionResponseDto {
    name: string;
    constructor(partial: Partial<Permission>);
}
