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
exports.AccountResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const trial_response_dto_1 = require("../../trials/dtos/trial-response.dto");
const system_modules_response_dto_1 = require("../../system-modules/dtos/system-modules-response.dto");
class AccountResponseDto {
    constructor(partial) {
        this.uuid = partial.uuid;
        this.in_trial = partial.in_trial;
        this.lastTrial = null;
        this.systemModules = [];
        if (partial.lastTrial) {
            this.lastTrial = new trial_response_dto_1.TrialResponseDto(partial.lastTrial);
        }
        if (partial.systemModules && partial.systemModules.length > 0) {
            this.systemModules = partial.systemModules.map((module) => new system_modules_response_dto_1.SystemModuleResponseDto(module));
        }
    }
}
exports.AccountResponseDto = AccountResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'in_trial' }),
    __metadata("design:type", Boolean)
], AccountResponseDto.prototype, "in_trial", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'lastTrial' }),
    (0, class_transformer_1.Type)(() => trial_response_dto_1.TrialResponseDto),
    __metadata("design:type", trial_response_dto_1.TrialResponseDto)
], AccountResponseDto.prototype, "lastTrial", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'systemModules' }),
    (0, class_transformer_1.Type)(() => system_modules_response_dto_1.SystemModuleResponseDto),
    __metadata("design:type", Array)
], AccountResponseDto.prototype, "systemModules", void 0);
//# sourceMappingURL=account-response.dto.js.map