"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionChargesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subscription_charge_entity_1 = require("../../entities/subscription-charge.entity");
const subscription_charges_service_1 = require("./subscription-charges.service");
const subscription_charges_controller_1 = require("./subscription-charges.controller");
let SubscriptionChargesModule = class SubscriptionChargesModule {
};
exports.SubscriptionChargesModule = SubscriptionChargesModule;
exports.SubscriptionChargesModule = SubscriptionChargesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subscription_charge_entity_1.SubscriptionCharge])],
        providers: [subscription_charges_service_1.SubscriptionChargesService],
        controllers: [subscription_charges_controller_1.SubscriptionChargesController],
        exports: [subscription_charges_service_1.SubscriptionChargesService],
    })
], SubscriptionChargesModule);
//# sourceMappingURL=subscription-charges.module.js.map