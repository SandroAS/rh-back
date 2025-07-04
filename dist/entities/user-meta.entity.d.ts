import { User } from './user.entity';
export declare class UserMeta {
    id: number;
    user_id: number;
    user: User;
    key: string;
    value: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
}
