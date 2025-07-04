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
exports.ServiceResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const system_modules_response_dto_1 = require("../../system-modules/dtos/system-modules-response.dto");
class ServiceResponseDto {
    constructor(partial) {
        this.uuid = partial.uuid;
        this.name = partial.name;
        this.description = partial.description;
        this.price = partial.price;
        if (partial.systemModule) {
            this.systemModule = new system_modules_response_dto_1.SystemModuleResponseDto(partial.systemModule);
        }
    }
}
exports.ServiceResponseDto = ServiceResponseDto;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "account_id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "system_module_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ServiceResponseDto.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ServiceResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ServiceResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", system_modules_response_dto_1.SystemModuleResponseDto)
], ServiceResponseDto.prototype, "systemModule", void 0);
//# sourceMappingURL=service-response.dto.js.map