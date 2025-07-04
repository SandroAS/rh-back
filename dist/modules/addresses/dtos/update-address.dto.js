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
exports.UpdateAddressDto = void 0;
const class_validator_1 = require("class-validator");
const address_entity_1 = require("../../../entities/address.entity");
class UpdateAddressDto {
}
exports.UpdateAddressDto = UpdateAddressDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CEP deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CEP é obrigatório.' }),
    (0, class_validator_1.Matches)(/^\d{8}$|^\d{5}-\d{3}$/, { message: 'O CEP deve ter 8 dígitos (ex: 12345678) ou 9 dígitos com hífen (ex: 12345-678).' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "cep", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A rua deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A rua é obrigatória.' }),
    (0, class_validator_1.Length)(3, 255, { message: 'A rua deve ter entre 3 e 255 caracteres.' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O número deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O número é obrigatório.' }),
    (0, class_validator_1.Length)(1, 20, { message: 'O número deve ter entre 1 e 20 caracteres.' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O complemento deve ser uma string.' }),
    (0, class_validator_1.Length)(0, 255, { message: 'O complemento deve ter no máximo 255 caracteres.' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "complement", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O bairro deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O bairro é obrigatório.' }),
    (0, class_validator_1.Length)(3, 255, { message: 'O bairro deve ter entre 3 e 255 caracteres.' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "neighborhood", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A cidade deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A cidade é obrigatória.' }),
    (0, class_validator_1.Length)(3, 255, { message: 'A cidade deve ter entre 3 e 255 caracteres.' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(address_entity_1.BrazilianStates, { message: 'Estado inválido. Escolha uma sigla válida (ex: SP, MG).' }),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "state", void 0);
//# sourceMappingURL=update-address.dto.js.map