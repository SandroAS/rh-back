import { UpdateAddressDto } from '@/modules/addresses/dtos/update-address.dto';
export declare class UpdateCompanyDto {
    name?: string;
    social_reason?: string;
    cnpj?: string;
    cellphone?: string;
    email?: string;
    address?: UpdateAddressDto;
}
