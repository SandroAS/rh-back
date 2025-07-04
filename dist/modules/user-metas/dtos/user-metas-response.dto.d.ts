import { UserMeta } from '@/entities/user-meta.entity';
export declare class UserMetasResponseDto {
    key: string;
    value: string;
    description: string;
    constructor(partial: Partial<UserMeta>);
}
