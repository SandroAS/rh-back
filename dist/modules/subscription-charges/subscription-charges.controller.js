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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionChargesController = void 0;
const common_1 = require("@nestjs/common");
const subscription_charges_service_1 = require("./subscription-charges.service");
let SubscriptionChargesController = class SubscriptionChargesController {
    constructor(chargesService) {
        this.chargesService = chargesService;
    }
    findAll() {
        return this.chargesService.findAll();
    }
    findOne(id) {
        return this.chargesService.findOne(+id);
    }
    create(data) {
        return this.chargesService.create(data);
    }
    update(id, data) {
        return this.chargesService.update(+id, data);
    }
    remove(id) {
        return this.chargesService.remove(+id);
    }
};
exports.SubscriptionChargesController = SubscriptionChargesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionChargesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionChargesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SubscriptionChargesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SubscriptionChargesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionChargesController.prototype, "remove", null);
exports.SubscriptionChargesController = SubscriptionChargesController = __decorate([
    (0, common_1.Controller)('subscription-charges'),
    __metadata("design:paramtypes", [subscription_charges_service_1.SubscriptionChargesService])
], SubscriptionChargesController);
//# sourceMappingURL=subscription-charges.controller.js.map