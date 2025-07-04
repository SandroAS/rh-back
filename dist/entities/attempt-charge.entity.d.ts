import { PaymentIntention } from './payment-intention.entity';
export type GatewayProvider = 'PAGARME';
export declare class AttemptCharge {
    id: number;
    uuid: string;
    generateUuid(): void;
    payment_intention_id: number;
    paymentIntention: PaymentIntention;
    status: 'pending' | 'failed' | 'success';
    amount: number;
    method: 'credit_card' | 'pix' | 'boleto';
    gateway: GatewayProvider;
    attempt_number: number;
    attempt_at: Date;
    created_at: Date;
    updated_at: Date;
}
