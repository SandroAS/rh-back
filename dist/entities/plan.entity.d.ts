import { Subscription } from './subscription.entity';
import { Sale } from './sale.entity';
export declare class Plan {
    id: number;
    uuid: string;
    generateUuid(): void;
    name: string;
    description: string;
    is_dynamic: boolean;
    base_price: number;
    price_per_professional: number;
    interval: 'monthly' | 'yearly';
    user_limit: number;
    subscriptions: Subscription[];
    sales: Sale[];
    created_at: Date;
    updated_at: Date;
}
