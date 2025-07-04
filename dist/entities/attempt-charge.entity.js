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
exports.AttemptCharge = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const payment_intention_entity_1 = require("./payment-intention.entity");
let AttemptCharge = class AttemptCharge {
    generateUuid() {
        this.uuid = (0, uuid_1.v4)();
    }
};
exports.AttemptCharge = AttemptCharge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AttemptCharge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    __metadata("design:type", String)
], AttemptCharge.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttemptCharge.prototype, "generateUuid", null);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AttemptCharge.prototype, "payment_intention_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_intention_entity_1.PaymentIntention, intention => intention.attemptCharges),
    (0, typeorm_1.JoinColumn)({ name: 'payment_intention_id' }),
    __metadata("design:type", payment_intention_entity_1.PaymentIntention)
], AttemptCharge.prototype, "paymentIntention", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AttemptCharge.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], AttemptCharge.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AttemptCharge.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['PAGARME'] }),
    __metadata("design:type", String)
], AttemptCharge.prototype, "gateway", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AttemptCharge.prototype, "attempt_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AttemptCharge.prototype, "attempt_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AttemptCharge.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], AttemptCharge.prototype, "updated_at", void 0);
exports.AttemptCharge = AttemptCharge = __decorate([
    (0, typeorm_1.Entity)('attempt_charges')
], AttemptCharge);
//# sourceMappingURL=attempt-charge.entity.js.map