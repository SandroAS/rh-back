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
exports.AuthResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../../entities/user.entity");
const role_response_dto_1 = require("../../roles/dtos/role-response.dto");
const account_response_dto_1 = require("../../accounts/dtos/account-response.dto");
const user_metas_response_dto_1 = require("../../user-metas/dtos/user-metas-response.dto");
const company_auth_response_dto_1 = require("../../companies/dtos/company-auth-response.dto");
const job_position_simple_response_dto_1 = require("../../job-positions/dtos/job-position-simple-response.dto");
class AuthResponseDto {
    constructor(partial) {
        this.uuid = partial.uuid;
        this.name = partial.name;
        this.email = partial.email;
        this.cellphone = partial.cellphone;
        this.cpf = partial.cpf;
        this.profile_img_url = partial.profile_img_url;
        this.gender = partial.gender;
        this.is_active = partial.is_active;
        this.password = partial.password ? 'passworldAlreadySet' : null;
        this.role = null;
        this.account = null;
        this.userMetas = [];
        if (partial.role) {
            this.role = new role_response_dto_1.RoleResponseDto(partial.role);
        }
        if (partial.account) {
            this.account = new account_response_dto_1.AccountResponseDto(partial.account);
        }
        if (partial.userMetas && partial.userMetas.length > 0) {
            this.userMetas = partial.userMetas.map((userMeta) => new user_metas_response_dto_1.UserMetasResponseDto(userMeta));
        }
        if (partial.companies && partial.companies.length > 0) {
            this.companies = partial.companies.map((company) => new company_auth_response_dto_1.CompanyAuthResponseDto(company));
        }
        if (partial.jobPosition) {
            this.jobPosition = new job_position_simple_response_dto_1.default(partial.jobPosition);
        }
    }
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "cellphone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "cpf", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "profile_img_url", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'is_active' }),
    __metadata("design:type", Boolean)
], AuthResponseDto.prototype, "is_active", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => role_response_dto_1.RoleResponseDto),
    __metadata("design:type", role_response_dto_1.RoleResponseDto)
], AuthResponseDto.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => account_response_dto_1.AccountResponseDto),
    __metadata("design:type", account_response_dto_1.AccountResponseDto)
], AuthResponseDto.prototype, "account", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_metas_response_dto_1.UserMetasResponseDto),
    __metadata("design:type", Array)
], AuthResponseDto.prototype, "userMetas", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => company_auth_response_dto_1.CompanyAuthResponseDto),
    __metadata("design:type", Array)
], AuthResponseDto.prototype, "companies", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => job_position_simple_response_dto_1.default),
    __metadata("design:type", job_position_simple_response_dto_1.default)
], AuthResponseDto.prototype, "jobPosition", void 0);
//# sourceMappingURL=auth-response.dto.js.map