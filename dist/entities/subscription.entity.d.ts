import { Plan } from './plan.entity';
import { Account } from './account.entity';
import { Sale } from './sale.entity';
import { SubscriptionCharge } from './subscription-charge.entity';
export declare enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED",
    PENDING = "PENDING"
}
export declare class Subscription {
    id: number;
    uuid: string;
    generateUuid(): void;
    account: Account;
    account_id: number;
    plan: Plan;
    plan_id: number;
    started_at: Date;
    ended_at: Date;
    cancelled: boolean;
    status: SubscriptionStatus;
    sales: Sale[];
    charges: SubscriptionCharge[];
    created_at: Date;
    updated_at: Date;
}
