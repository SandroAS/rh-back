import { AttemptCharge } from './attempt-charge.entity';
import { User } from './user.entity';
import { Account } from './account.entity';
export declare class PaymentIntention {
    id: number;
    uuid: string;
    generateUuid(): void;
    userId: number;
    user: User;
    accountId?: number;
    account?: Account;
    status: 'charging' | 'waiting_payment' | 'expired' | 'cancelled' | 'completed';
    amount: number;
    method: 'credit_card' | 'pix' | 'boleto';
    pixCopyPaste?: string;
    qr_code_img_url?: string;
    bar_code?: string;
    bar_code_img_url?: string;
    expires_at: Date;
    total_attempts: number;
    sale_id: number;
    attemptCharges: AttemptCharge[];
    parent_intention_id?: number;
    parentIntention?: PaymentIntention;
    created_at: Date;
    updated_at: Date;
}
