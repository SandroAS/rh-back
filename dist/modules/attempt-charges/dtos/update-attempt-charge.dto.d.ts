import { GatewayProvider } from '@/entities/attempt-charge.entity';
export declare class UpdateAttemptChargeDto {
    payment_intention_id?: number;
    status?: 'pending' | 'failed' | 'success';
    amount?: number;
    method?: 'credit_card' | 'pix' | 'boleto';
    gateway?: GatewayProvider;
    attempt_number?: number;
    attempt_at?: Date;
}
