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
exports.SubscriptionCharge = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const subscription_entity_1 = require("./subscription.entity");
const sale_entity_1 = require("./sale.entity");
let SubscriptionCharge = class SubscriptionCharge {
    generateUuid() {
        this.uuid = (0, uuid_1.v4)();
    }
};
exports.SubscriptionCharge = SubscriptionCharge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubscriptionCharge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    __metadata("design:type", String)
], SubscriptionCharge.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionCharge.prototype, "generateUuid", null);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SubscriptionCharge.prototype, "subscription_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscription_entity_1.Subscription, (subscription) => subscription.charges, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'subscription_id' }),
    __metadata("design:type", subscription_entity_1.Subscription)
], SubscriptionCharge.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SubscriptionCharge.prototype, "sale_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sale_entity_1.Sale, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id' }),
    __metadata("design:type", sale_entity_1.Sale)
], SubscriptionCharge.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SubscriptionCharge.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['open', 'paid', 'failed'], default: 'open' }),
    __metadata("design:type", String)
], SubscriptionCharge.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SubscriptionCharge.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], SubscriptionCharge.prototype, "updated_at", void 0);
exports.SubscriptionCharge = SubscriptionCharge = __decorate([
    (0, typeorm_1.Entity)('subscription_charges')
], SubscriptionCharge);
//# sourceMappingURL=subscription-charge.entity.js.map