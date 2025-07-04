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
exports.CreateAttemptChargeDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAttemptChargeDto {
}
exports.CreateAttemptChargeDto = CreateAttemptChargeDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateAttemptChargeDto.prototype, "payment_intention_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['pending', 'failed', 'success']),
    __metadata("design:type", String)
], CreateAttemptChargeDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateAttemptChargeDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['credit_card', 'pix', 'boleto']),
    __metadata("design:type", String)
], CreateAttemptChargeDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['PAGARME']),
    __metadata("design:type", String)
], CreateAttemptChargeDto.prototype, "gateway", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateAttemptChargeDto.prototype, "attempt_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateAttemptChargeDto.prototype, "attempt_at", void 0);
//# sourceMappingURL=create-attempt-charge.dto.js.map