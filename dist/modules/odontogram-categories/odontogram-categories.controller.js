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
exports.OdontogramCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const odontogram_categories_service_1 = require("./odontogram-categories.service");
const create_odontogram_category_dto_1 = require("./dtos/create-odontogram-category.dto");
const update_odontogram_category_dto_1 = require("./dtos/update-odontogram-category.dto");
const account_id_decorator_1 = require("../../common/decorators/account-id.decorator");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
let OdontogramCategoriesController = class OdontogramCategoriesController {
    constructor(odontogramCategoryService) {
        this.odontogramCategoryService = odontogramCategoryService;
    }
    async create(createOdontogramCategoryDto, accountId) {
        return this.odontogramCategoryService.createForAccountId(createOdontogramCategoryDto, accountId);
    }
    async findAll(query, accountId) {
        return this.odontogramCategoryService.findAllForAccountId(query, accountId);
    }
    async findOne(uuid, accountId) {
        return this.odontogramCategoryService.findOneForAccountId(uuid, accountId);
    }
    async update(uuid, updateOdontogramCategoryDto, accountId) {
        return this.odontogramCategoryService.updateForAccountId(uuid, updateOdontogramCategoryDto, accountId);
    }
    async remove(uuid, accountId) {
        return this.odontogramCategoryService.removeForAccountId(uuid, accountId);
    }
};
exports.OdontogramCategoriesController = OdontogramCategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, account_id_decorator_1.AccountId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_odontogram_category_dto_1.CreateOdontogramCategoryDto, Number]),
    __metadata("design:returntype", Promise)
], OdontogramCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, account_id_decorator_1.AccountId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Number]),
    __metadata("design:returntype", Promise)
], OdontogramCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, account_id_decorator_1.AccountId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OdontogramCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, account_id_decorator_1.AccountId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_odontogram_category_dto_1.UpdateOdontogramCategoryDto, Number]),
    __metadata("design:returntype", Promise)
], OdontogramCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, account_id_decorator_1.AccountId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OdontogramCategoriesController.prototype, "remove", null);
exports.OdontogramCategoriesController = OdontogramCategoriesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('odontogram-categories'),
    __metadata("design:paramtypes", [odontogram_categories_service_1.OdontogramCategoriesService])
], OdontogramCategoriesController);
//# sourceMappingURL=odontogram-categories.controller.js.map