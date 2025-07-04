import { Address, BrazilianStates } from 'src/entities/address.entity';
export declare class AddressAuthResponseDto {
    uuid: string;
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: BrazilianStates;
    constructor(address: Address);
}
