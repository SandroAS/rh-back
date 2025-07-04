import { Repository } from 'typeorm';
import { Address } from 'src/entities/address.entity';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
import { AddressAuthResponseDto } from './dtos/address-auth-response.dto';
export declare class AddressesService {
    private addressRepository;
    private readonly logger;
    constructor(addressRepository: Repository<Address>);
    create(createAddressDto: CreateAddressDto): Promise<Address>;
    findOneByUuid(uuid: string): Promise<AddressAuthResponseDto>;
    findAll(): Promise<AddressAuthResponseDto[]>;
    update(uuid: string, updateAddressDto: UpdateAddressDto): Promise<AddressAuthResponseDto>;
    remove(uuid: string): Promise<void>;
}
