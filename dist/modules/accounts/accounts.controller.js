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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_account_user_dto_1 = require("./dtos/create-account-user.dto");
const update_account_user_dto_1 = require("./dtos/update-account-user-dto");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    createAccountUser(data, req) {
        const user = req.user;
        return this.accountsService.createAccountUser(data, user);
    }
    findAllAccountUsers(req, pagination) {
        const user = req.user;
        return this.accountsService.findAllAccountUsersWithPagination(user, pagination);
    }
    updateAccountUser(uuid, data, req) {
        const user = req.user;
        return this.accountsService.updateAccountUser(uuid, data, user);
    }
    updateAccountUserIsActive(uuid) {
        return this.accountsService.updateAccountUserIsActive(uuid);
    }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, common_1.Post)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_user_dto_1.CreateAccountUserDto, Object]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "createAccountUser", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "findAllAccountUsers", null);
__decorate([
    (0, common_1.Put)('users/:uuid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_account_user_dto_1.UpdateAccountUserDto, Object]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "updateAccountUser", null);
__decorate([
    (0, common_1.Patch)('users/is-active/:uuid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "updateAccountUserIsActive", null);
exports.AccountsController = AccountsController = __decorate([
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map