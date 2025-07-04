import { Subscription } from './subscription.entity';
import { Sale } from './sale.entity';
export type ChargeStatus = 'open' | 'paid' | 'failed';
export declare class SubscriptionCharge {
    id: number;
    uuid: string;
    generateUuid(): void;
    subscription_id: number;
    subscription: Subscription;
    sale_id: number;
    sale: Sale;
    amount: number;
    status: ChargeStatus;
    created_at: Date;
    updated_at: Date;
}
