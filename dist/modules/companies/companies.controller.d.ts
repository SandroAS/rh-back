import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { CompanyResponseDto } from './dtos/company-response.dto';
export declare class CompaniesController {
    private readonly companyService;
    constructor(companyService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto, req: any): Promise<CompanyResponseDto>;
    findAll(): Promise<CompanyResponseDto[]>;
    findOne(uuid: string, req: any): Promise<CompanyResponseDto>;
    update(uuid: string, updateCompanyDto: UpdateCompanyDto, req: any): Promise<CompanyResponseDto>;
    remove(uuid: string, req: any): Promise<void>;
}
