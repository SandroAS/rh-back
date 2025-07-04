import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { CompanyResponseDto } from './dtos/company-response.dto';
import { AddressesService } from '../addresses/addresses.service';
export declare class CompaniesService {
    private companyRepository;
    private readonly addressesService;
    private readonly logger;
    constructor(companyRepository: Repository<Company>, addressesService: AddressesService);
    create(createCompanyDto: CreateCompanyDto, user: User): Promise<CompanyResponseDto>;
    findOneByUuid(uuid: string, relations?: string[]): Promise<CompanyResponseDto>;
    findAll(): Promise<CompanyResponseDto[]>;
    update(uuid: string, updateCompanyDto: UpdateCompanyDto, user: User): Promise<CompanyResponseDto>;
    remove(uuid: string): Promise<void>;
    isCompanyOwner(companyUuid: string, userId: number): Promise<boolean>;
}
