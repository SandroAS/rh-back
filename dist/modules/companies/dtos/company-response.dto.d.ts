import { Company } from '@/entities/company.entity';
import { AddressResponseDto } from '@/modules/addresses/dtos/address-response.dto';
export declare class CompanyResponseDto {
    uuid: string;
    address: AddressResponseDto;
    constructor(partial: Company);
}
