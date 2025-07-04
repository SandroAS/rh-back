import { Account } from './account.entity';
import { PaymentIntention } from './payment-intention.entity';
import { Sale } from './sale.entity';
import { Role } from './role.entity';
import { UserMeta } from './user-meta.entity';
import { Company } from './company.entity';
import { Address } from './address.entity';
export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare class User {
    id: number;
    uuid: string;
    generateUuid(): void;
    account_id: number;
    account: Account;
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
    gender: Gender | null;
    password: string;
    google_id: string;
    profile_img_url: string;
    is_active: boolean;
    paymentIntentions: PaymentIntention[];
    sales: Sale[];
    role_id: number;
    role: Role;
    userMetas: UserMeta[];
    companies: Company[];
    address: Address;
    address_id: number;
    created_at: Date;
    updated_at: Date;
}
