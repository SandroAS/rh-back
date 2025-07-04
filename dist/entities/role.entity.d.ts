import { User } from './user.entity';
import { Permission } from './permission.entity';
export declare class Role {
    id: number;
    uuid: string;
    generateUuid(): void;
    name: string;
    users: User[];
    permissions: Permission[];
    created_at: Date;
    updated_at: Date;
}
