import { SubscriptionChargesService } from './subscription-charges.service';
import { SubscriptionCharge } from '@/entities/subscription-charge.entity';
export declare class SubscriptionChargesController {
    private readonly chargesService;
    constructor(chargesService: SubscriptionChargesService);
    findAll(): Promise<SubscriptionCharge[]>;
    findOne(id: number): Promise<SubscriptionCharge>;
    create(data: Partial<SubscriptionCharge>): Promise<SubscriptionCharge>;
    update(id: number, data: Partial<SubscriptionCharge>): Promise<SubscriptionCharge>;
    remove(id: number): Promise<void>;
}
