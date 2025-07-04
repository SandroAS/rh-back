import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
import { AddressAuthResponseDto } from './dtos/address-auth-response.dto';
export declare class AddressesController {
    private readonly addressService;
    constructor(addressService: AddressesService);
    create(createAddressDto: CreateAddressDto): Promise<AddressAuthResponseDto>;
    findAll(): Promise<AddressAuthResponseDto[]>;
    findOne(uuid: string, req: any): Promise<AddressAuthResponseDto>;
    update(uuid: string, updateAddressDto: UpdateAddressDto): Promise<AddressAuthResponseDto>;
    remove(uuid: string): Promise<void>;
}
