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
exports.OdontogramCategoriesService = void 0;
const odontogram_category_entity_1 = require("../../entities/odontogram-category.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../../common/services/base.service");
let OdontogramCategoriesService = class OdontogramCategoriesService extends base_service_1.BaseService {
    constructor(odontogramCategoryRepository) {
        super(odontogramCategoryRepository);
        this.odontogramCategoryRepository = odontogramCategoryRepository;
    }
    async createForAccountId(createDto, accountId) {
        return super.create({ ...createDto, account_id: accountId });
    }
    async findAllForAccountId(query, accountId) {
        const searchColumns = ['name'];
        return super.findAndPaginate(query, searchColumns, (qb) => {
            qb.andWhere('entity.account_id = :accountId', { accountId });
        });
    }
    async findOneForAccountId(uuid, accountId) {
        return await super.findByUuid(uuid, { where: { account_id: accountId } });
    }
    async updateForAccountId(uuid, updateDto, accountId) {
        return await super.updateByUuid(uuid, updateDto, accountId);
    }
    async removeForAccountId(uuid, accountId) {
        return await super.removeByUuid(uuid, accountId);
    }
};
exports.OdontogramCategoriesService = OdontogramCategoriesService;
exports.OdontogramCategoriesService = OdontogramCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(odontogram_category_entity_1.OdontogramCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OdontogramCategoriesService);
//# sourceMappingURL=odontogram-categories.service.js.map