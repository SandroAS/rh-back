import { BrazilianStates } from '@/entities/address.entity';
export declare class UpdateAddressDto {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: BrazilianStates;
}
