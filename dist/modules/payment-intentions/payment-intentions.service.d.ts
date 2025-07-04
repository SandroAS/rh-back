import { Repository } from 'typeorm';
import { PaymentIntention } from '@/entities/payment-intention.entity';
export declare class PaymentIntentionsService {
    private readonly repo;
    constructor(repo: Repository<PaymentIntention>);
    findAll(): Promise<PaymentIntention[]>;
    findOne(id: number): Promise<PaymentIntention>;
    create(data: Partial<PaymentIntention>): Promise<PaymentIntention>;
    update(id: number, data: Partial<PaymentIntention>): Promise<PaymentIntention>;
    delete(id: number): Promise<void>;
}
