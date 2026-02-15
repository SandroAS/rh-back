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
exports.TrialsController = void 0;
const common_1 = require("@nestjs/common");
const trials_service_1 = require("./trials.service");
const account_id_decorator_1 = require("../../common/decorators/account-id.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const trial_response_dto_1 = require("./dtos/trial-response.dto");
let TrialsController = class TrialsController {
    constructor(trialsService) {
        this.trialsService = trialsService;
    }
    async findMyTrial(account_id) {
        return new trial_response_dto_1.TrialResponseDto(await this.trialsService.findMyTrial(account_id));
    }
};
exports.TrialsController = TrialsController;
__decorate([
    (0, common_1.Get)('/my-trial'),
    __param(0, (0, account_id_decorator_1.AccountId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TrialsController.prototype, "findMyTrial", null);
exports.TrialsController = TrialsController = __decorate([
    (0, common_1.Controller)('trials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [trials_service_1.TrialsService])
], TrialsController);
//# sourceMappingURL=trials.controller.js.map