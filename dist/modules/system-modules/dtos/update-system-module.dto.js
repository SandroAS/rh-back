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
exports.UpdateSystemModuleDto = void 0;
const system_module_entity_1 = require("../../../entities/system-module.entity");
const class_validator_1 = require("class-validator");
class UpdateSystemModuleDto {
}
exports.UpdateSystemModuleDto = UpdateSystemModuleDto;
__decorate([
    (0, class_validator_1.IsEnum)(system_module_entity_1.SystemModuleName, { message: 'O nome do módulo deve ser um valor válido do enum.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome do módulo é obrigatório.' }),
    __metadata("design:type", String)
], UpdateSystemModuleDto.prototype, "name", void 0);
//# sourceMappingURL=update-system-module.dto.js.map