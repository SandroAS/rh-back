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
exports.AuthSignupDto = void 0;
const class_validator_1 = require("class-validator");
const is_cpf_validator_1 = require("../../../common/validators/is-cpf.validator");
const match_password_validator_1 = require("../../../common/validators/match-password.validator");
const system_module_entity_1 = require("../../../entities/system-module.entity");
class AuthSignupDto {
}
exports.AuthSignupDto = AuthSignupDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
    __metadata("design:type", String)
], AuthSignupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser um endereço de e-mail válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O e-mail é obrigatório.' }),
    __metadata("design:type", String)
], AuthSignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O telefone é obrigatório.' }),
    (0, class_validator_1.MinLength)(14, { message: 'O telefone deve ter pelo menos 14 dígitos.' }),
    (0, class_validator_1.MaxLength)(15, { message: 'O telefone deve ter pelo menos 15 dígitos.' }),
    __metadata("design:type", String)
], AuthSignupDto.prototype, "cellphone", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CPF deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CPF é obrigatório.' }),
    (0, is_cpf_validator_1.IsCpf)({ message: 'CPF inválido.' }),
    __metadata("design:type", String)
], AuthSignupDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O módulo deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O módulo é obrigatório.' }),
    __metadata("design:type", String)
], AuthSignupDto.prototype, "moduleType", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A senha é obrigatória.' }),
    (0, class_validator_1.MinLength)(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
    __metadata("design:type", String)
], AuthSignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A confirmação de senha deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A confirmação de senha é obrigatória quando fornecida.' }),
    (0, match_password_validator_1.MatchPassword)('password', { message: 'A confirmação de senha não corresponde à senha.' }),
    __metadata("design:type", String)
], AuthSignupDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'A aceitação dos termos deve ser um valor booleano.' }),
    (0, class_validator_1.Equals)(true, { message: 'Você deve aceitar os termos de serviço e política de privacidade.' }),
    __metadata("design:type", Boolean)
], AuthSignupDto.prototype, "termsAccepted", void 0);
//# sourceMappingURL=auth-signup.js.map