import { User } from './user.entity';
import { Address } from './address.entity';
export declare class Company {
    id: number;
    uuid: string;
    generateUuid(): void;
    user_id: number;
    user: User;
    name: string;
    social_reason: string;
    cnpj: string;
    cellphone: string;
    email: string;
    address: Address;
    address_id: number;
    created_at: Date;
    updated_at: Date;
}
