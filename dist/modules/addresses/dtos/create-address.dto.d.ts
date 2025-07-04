import { BrazilianStates } from '@/entities/address.entity';
export declare class CreateAddressDto {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: BrazilianStates;
}
