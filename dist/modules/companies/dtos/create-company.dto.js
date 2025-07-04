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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyDto = void 0;
const class_validator_1 = require("class-validator");
const is_cnpj_validator_1 = require("../../../common/validators/is-cnpj.validator");
const create_address_dto_1 = require("../../addresses/dtos/create-address.dto");
const class_transformer_1 = require("class-transformer");
class CreateCompanyDto {
}
exports.CreateCompanyDto = CreateCompanyDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, class_validator_1.Length)(3, 255, { message: 'O nome deve ter entre 3 e 255 caracteres.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A razão social deve ser uma string.' }),
    (0, class_validator_1.Length)(3, 255, { message: 'A razão social deve ter entre 3 e 255 caracteres.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "social_reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O CNPJ deve ser uma string.' }),
    (0, is_cnpj_validator_1.IsCnpj)({ message: 'CNPJ inválido.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string.' }),
    (0, class_validator_1.Length)(8, 20, { message: 'O telefone deve ter entre 8 e 20 caracteres.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "cellphone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido.' }),
    (0, class_validator_1.Length)(5, 255, { message: 'O email deve ter entre 5 e 255 caracteres.' }),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_address_dto_1.CreateAddressDto),
    __metadata("design:type", create_address_dto_1.CreateAddressDto)
], CreateCompanyDto.prototype, "address", void 0);
//# sourceMappingURL=create-company.dto.js.map