import { Account } from './account.entity';
export declare class Trial {
    id: number;
    uuid: string;
    generateUuid(): void;
    started_at: Date;
    ended_at: Date;
    account: Account;
    account_id: number;
    created_at: Date;
    updated_at: Date;
}
