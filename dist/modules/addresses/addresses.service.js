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
var AddressesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("../../entities/address.entity");
const address_auth_response_dto_1 = require("./dtos/address-auth-response.dto");
let AddressesService = AddressesService_1 = class AddressesService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
        this.logger = new common_1.Logger(AddressesService_1.name);
    }
    async create(createAddressDto) {
        const address = this.addressRepository.create(createAddressDto);
        try {
            const savedAddress = await this.addressRepository.save(address);
            return savedAddress;
        }
        catch (error) {
            this.logger.error(`Erro ao tentar criar enderesso: ${error.message}`, error.stack);
            throw new common_1.InternalServerErrorException('Ocorreu um erro ao criar o endereço.');
        }
    }
    async findOneByUuid(uuid) {
        const address = await this.addressRepository.findOne({ where: { uuid } });
        if (!address) {
            this.logger.warn(`Endereço com UUID '${uuid}' não encontrado.`);
            throw new common_1.NotFoundException(`Endereço com UUID '${uuid}' não encontrado.`);
        }
        return new address_auth_response_dto_1.AddressAuthResponseDto(address);
    }
    async findAll() {
        const addresses = await this.addressRepository.find();
        return addresses.map(address => new address_auth_response_dto_1.AddressAuthResponseDto(address));
    }
    async update(uuid, updateAddressDto) {
        const address = await this.addressRepository.findOne({ where: { uuid } });
        if (!address) {
            this.logger.warn(`Tentativa de atualizar endereço que não existe, UUID: ${uuid}`);
            throw new common_1.NotFoundException(`Endereço com UUID '${uuid}' não encontrado.`);
        }
        Object.assign(address, updateAddressDto);
        try {
            const updatedAddress = await this.addressRepository.save(address);
            return new address_auth_response_dto_1.AddressAuthResponseDto(updatedAddress);
        }
        catch (error) {
            this.logger.error(`Erro ao tentar atualizar endereço ${uuid}: ${error.message}`, error.stack);
            throw new common_1.InternalServerErrorException('Ocorreu um erro ao atualizar o endereço.');
        }
    }
    async remove(uuid) {
        const result = await this.addressRepository.delete({ uuid });
        if (result.affected === 0) {
            this.logger.warn(`Tentativa de remover endereço não existente UUID: ${uuid}`);
            throw new common_1.NotFoundException(`Endereço com UUID '${uuid}' não encontrado para remoção.`);
        }
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = AddressesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressesService);
//# sourceMappingURL=addresses.service.js.map