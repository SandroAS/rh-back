import { Role } from './role.entity';
export declare class Permission {
    id: number;
    uuid: string;
    generateUuid(): void;
    name: string;
    description: string;
    roles: Role[];
    created_at: Date;
    updated_at: Date;
}
