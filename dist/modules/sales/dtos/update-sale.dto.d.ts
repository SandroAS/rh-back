import { SaleType, PaymentMethod, SaleStatus, GatewayProvider } from '@/entities/sale.entity';
export declare class UpdateSaleDto {
    user_id?: number;
    account_id?: number;
    plan_id?: number;
    subscription_id?: number;
    subscription_charge_id?: number;
    transaction_id?: string;
    type?: SaleType;
    original_amount?: number;
    discount?: number;
    gateway_fee?: number;
    total?: number;
    method?: PaymentMethod;
    installments?: number;
    gateway?: GatewayProvider;
    status?: SaleStatus;
    paid_at?: Date;
    failed_reason?: string;
    refund_solicitation_id?: number;
    refund_solicitation_at?: Date;
    refunded_at?: Date;
}
