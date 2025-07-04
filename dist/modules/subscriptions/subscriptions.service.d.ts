import { Repository } from 'typeorm';
import { Subscription } from '@/entities/subscription.entity';
export declare class SubscriptionsService {
    private readonly subscriptionRepository;
    constructor(subscriptionRepository: Repository<Subscription>);
    findAll(): Promise<Subscription[]>;
    findOne(id: number): Promise<Subscription>;
    create(data: Partial<Subscription>): Promise<Subscription>;
    update(id: number, data: Partial<Subscription>): Promise<Subscription>;
    remove(id: number): Promise<void>;
}
