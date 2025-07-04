"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CompaniesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../../entities/company.entity");
const company_response_dto_1 = require("./dtos/company-response.dto");
const addresses_service_1 = require("../addresses/addresses.service");
let CompaniesService = CompaniesService_1 = class CompaniesService {
    constructor(companyRepository, addressesService) {
        this.companyRepository = companyRepository;
        this.addressesService = addressesService;
        this.logger = new common_1.Logger(CompaniesService_1.name);
    }
    async create(createCompanyDto, user) {
        const existingCompanyByCnpj = await this.companyRepository.findOne({ where: { cnpj: createCompanyDto.cnpj } });
        if (existingCompanyByCnpj) {
            this.logger.warn(`Tentativa de criar empresa com CNPJ já existente: ${createCompanyDto.cnpj}`);
            throw new common_1.ConflictException('Já existe uma empresa cadastrada com este CNPJ.');
        }
        const company = this.companyRepository.create({
            ...createCompanyDto,
            user,
            user_id: user.id,
        });
        try {
            const savedCompany = await this.companyRepository.save(company);
            return new company_response_dto_1.CompanyResponseDto(savedCompany);
        }
        catch (err) {
            this.logger.error(`Erro ao tentar criar empresa: ${err.message}`, err.stack);
            throw new common_1.InternalServerErrorException('Ocorreu um erro ao criar a empresa.');
        }
    }
    async findOneByUuid(uuid, relations) {
        const company = await this.companyRepository.findOne({
            where: { uuid },
            relations: relations || [],
        });
        if (!company) {
            this.logger.warn(`Company with UUID '${uuid}' not found.`);
            throw new common_1.NotFoundException(`Empresa com UUID '${uuid}' não encontrada.`);
        }
        return new company_response_dto_1.CompanyResponseDto(company);
    }
    async findAll() {
        const companies = await this.companyRepository.find();
        return companies.map(company => new company_response_dto_1.CompanyResponseDto(company));
    }
    async update(uuid, updateCompanyDto, user) {
        const company = await this.companyRepository.findOne({ where: { uuid }, relations: ['address'] });
        if (!company) {
            this.logger.warn(`Tentativa de atualizar empresa não existente com UUID: ${uuid}`);
            throw new common_1.NotFoundException(`Empresa com UUID '${uuid}' não encontrada.`);
        }
        if (updateCompanyDto.cnpj && updateCompanyDto.cnpj !== company.cnpj) {
            const existingCompany = await this.companyRepository.findOne({ where: { cnpj: updateCompanyDto.cnpj } });
            if (existingCompany && existingCompany.uuid !== uuid) {
                this.logger.warn(`Tentativa de atualizar empresa com CNPJ já existente, CNPJ: ${updateCompanyDto.cnpj}`);
                throw new common_1.ConflictException('CNPJ já cadastrado para outra empresa.');
            }
        }
        if (updateCompanyDto.address !== undefined) {
            if (updateCompanyDto.address === null) {
                if (company.address) {
                    company.address = null;
                    await this.addressesService.remove(company.address.uuid);
                }
            }
            else if (company.address) {
                Object.assign(company.address, updateCompanyDto.address);
            }
            else {
                company.address = await this.addressesService.create(updateCompanyDto.address);
            }
        }
        const { address, ...restOfUpdateCompanyDto } = updateCompanyDto;
        Object.assign(company, restOfUpdateCompanyDto);
        try {
            const updatedCompany = await this.companyRepository.save(company);
            return new company_response_dto_1.CompanyResponseDto(updatedCompany);
        }
        catch (err) {
            this.logger.error(`Error ao tentar atualizar empresa ${uuid}: ${err.message}`, err.stack);
            throw new common_1.InternalServerErrorException('Ocorreu um erro ao atualizar a empresa e/ou seu endereço.');
        }
    }
    async remove(uuid) {
        const result = await this.companyRepository.delete({ uuid });
        if (result.affected === 0) {
            this.logger.warn(`Tentativa de remover uma empresa não existente, UUID: ${uuid}`);
            throw new common_1.NotFoundException(`Empresa com UUID '${uuid}' não encontrada para remoção.`);
        }
        this.logger.log(`Company with UUID ${uuid} removed successfully.`);
    }
    async isCompanyOwner(companyUuid, userId) {
        const company = await this.companyRepository.findOne({
            where: { uuid: companyUuid, user_id: userId },
        });
        return !!company;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = CompaniesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        addresses_service_1.AddressesService])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map