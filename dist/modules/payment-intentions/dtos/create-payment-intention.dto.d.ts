export declare class CreatePaymentIntentionDto {
    userId: number;
    accountId?: number;
    status: 'charging' | 'waiting_payment' | 'expired' | 'cancelled' | 'completed';
    amount: number;
    method: 'credit_card' | 'pix' | 'boleto';
    pixCopyPaste?: string;
    qr_code_img_url?: string;
    bar_code?: string;
    bar_code_img_url?: string;
    expires_at?: Date;
    total_attempts?: number;
    sale_id?: number;
    parent_intention_id?: number;
}
