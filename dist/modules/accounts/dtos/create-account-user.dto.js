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
exports.CreateAccountUserDto = void 0;
const class_validator_1 = require("class-validator");
const is_cpf_validator_1 = require("../../../common/validators/is-cpf.validator");
const roles_types_dto_1 = require("../../roles/dtos/roles-types.dto");
const match_password_validator_1 = require("../../../common/validators/match-password.validator");
class CreateAccountUserDto {
}
exports.CreateAccountUserDto = CreateAccountUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
    __metadata("design:type", String)
], CreateAccountUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser um endereço de e-mail válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O e-mail é obrigatório.' }),
    __metadata("design:type", String)
], CreateAccountUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O telefone é obrigatório.' }),
    (0, class_validator_1.MinLength)(14, { message: 'O telefone deve ter pelo menos 10 dígitos.' }),
    (0, class_validator_1.MaxLength)(15, { message: 'O telefone deve ter pelo menos 11 dígitos.' }),
    __metadata("design:type", String)
], CreateAccountUserDto.prototype, "cellphone", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CPF deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CPF é obrigatório.' }),
    (0, is_cpf_validator_1.IsCpf)({ message: 'CPF inválido.' }),
    __metadata("design:type", String)
], CreateAccountUserDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A senha é obrigatória.' }),
    (0, class_validator_1.MinLength)(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
    __metadata("design:type", String)
], CreateAccountUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A confirmação de senha deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A confirmação de senha é obrigatória quando fornecida.' }),
    (0, match_password_validator_1.MatchPassword)('password', { message: 'A confirmação de senha não corresponde à senha.' }),
    __metadata("design:type", String)
], CreateAccountUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(roles_types_dto_1.RolesTypes, { message: 'O tipo de usuário informado é inválido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O tipo de usuário é obrigatório.' }),
    __metadata("design:type", String)
], CreateAccountUserDto.prototype, "role", void 0);
//# sourceMappingURL=create-account-user.dto.js.map