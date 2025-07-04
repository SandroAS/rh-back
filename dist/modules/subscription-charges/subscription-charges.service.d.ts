import { Repository } from 'typeorm';
import { SubscriptionCharge } from '@/entities/subscription-charge.entity';
export declare class SubscriptionChargesService {
    private readonly chargeRepository;
    constructor(chargeRepository: Repository<SubscriptionCharge>);
    findAll(): Promise<SubscriptionCharge[]>;
    findOne(id: number): Promise<SubscriptionCharge>;
    create(data: Partial<SubscriptionCharge>): Promise<SubscriptionCharge>;
    update(id: number, data: Partial<SubscriptionCharge>): Promise<SubscriptionCharge>;
    remove(id: number): Promise<void>;
}
