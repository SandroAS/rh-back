import { Company } from '@/entities/company.entity';
import { AddressAuthResponseDto } from '@/modules/addresses/dtos/address-auth-response.dto';
export declare class CompanyAuthResponseDto {
    uuid: string;
    name: string;
    social_reason: string;
    cnpj: string;
    cellphone: string;
    email: string;
    address: AddressAuthResponseDto;
    constructor(partial: Company);
}
