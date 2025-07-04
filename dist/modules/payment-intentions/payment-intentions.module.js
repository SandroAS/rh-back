"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentIntentionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_intention_entity_1 = require("../../entities/payment-intention.entity");
const payment_intentions_service_1 = require("./payment-intentions.service");
const payment_intentions_controller_1 = require("./payment-intentions.controller");
let PaymentIntentionsModule = class PaymentIntentionsModule {
};
exports.PaymentIntentionsModule = PaymentIntentionsModule;
exports.PaymentIntentionsModule = PaymentIntentionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([payment_intention_entity_1.PaymentIntention])],
        providers: [payment_intentions_service_1.PaymentIntentionsService],
        controllers: [payment_intentions_controller_1.PaymentIntentionsController],
        exports: [payment_intentions_service_1.PaymentIntentionsService],
    })
], PaymentIntentionsModule);
//# sourceMappingURL=payment-intentions.module.js.map