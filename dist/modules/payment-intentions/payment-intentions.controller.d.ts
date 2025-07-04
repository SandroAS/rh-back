import { PaymentIntentionsService } from './payment-intentions.service';
import { PaymentIntention } from '@/entities/payment-intention.entity';
export declare class PaymentIntentionsController {
    private readonly service;
    constructor(service: PaymentIntentionsService);
    findAll(): Promise<PaymentIntention[]>;
    findOne(id: number): Promise<PaymentIntention>;
    create(data: Partial<PaymentIntention>): Promise<PaymentIntention>;
    update(id: number, data: Partial<PaymentIntention>): Promise<PaymentIntention>;
    delete(id: number): Promise<void>;
}
