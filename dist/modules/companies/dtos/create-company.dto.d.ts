import { CreateAddressDto } from '@/modules/addresses/dtos/create-address.dto';
export declare class CreateCompanyDto {
    name?: string;
    social_reason?: string;
    cnpj?: string;
    cellphone?: string;
    email?: string;
    address?: CreateAddressDto;
}
