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
exports.CompanyAuthResponseDto = void 0;
const address_auth_response_dto_1 = require("../../addresses/dtos/address-auth-response.dto");
const class_transformer_1 = require("class-transformer");
class CompanyAuthResponseDto {
    constructor(partial) {
        this.uuid = partial.uuid;
        this.name = partial.name;
        this.social_reason = partial.social_reason;
        this.cnpj = partial.cnpj;
        this.cellphone = partial.cellphone;
        this.email = partial.email;
        if (partial.address) {
            this.address = new address_auth_response_dto_1.AddressAuthResponseDto(partial.address);
        }
    }
}
exports.CompanyAuthResponseDto = CompanyAuthResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyAuthResponseDto.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyAuthResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyAuthResponseDto.prototype, "social_reason", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyAuthResponseDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyAuthResponseDto.prototype, "cellphone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CompanyAuthResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", address_auth_response_dto_1.AddressAuthResponseDto)
], CompanyAuthResponseDto.prototype, "address", void 0);
//# sourceMappingURL=company-auth-response.dto.js.map