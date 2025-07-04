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
exports.OdontogramCategory = exports.OdontogramCategoryType = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("./account.entity");
const base_entity_1 = require("../common/entities/base.entity");
var OdontogramCategoryType;
(function (OdontogramCategoryType) {
    OdontogramCategoryType["TOOTH"] = "TOOTH";
    OdontogramCategoryType["FACE"] = "FACE";
})(OdontogramCategoryType || (exports.OdontogramCategoryType = OdontogramCategoryType = {}));
let OdontogramCategory = class OdontogramCategory extends base_entity_1.BaseEntity {
};
exports.OdontogramCategory = OdontogramCategory;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], OdontogramCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 7 }),
    __metadata("design:type", String)
], OdontogramCategory.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: OdontogramCategoryType }),
    __metadata("design:type", String)
], OdontogramCategory.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OdontogramCategory.prototype, "account_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, account => account.odontogramCategories, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'account_id', referencedColumnName: 'id' }),
    __metadata("design:type", account_entity_1.Account)
], OdontogramCategory.prototype, "account", void 0);
exports.OdontogramCategory = OdontogramCategory = __decorate([
    (0, typeorm_1.Entity)('odontogram_categories')
], OdontogramCategory);
//# sourceMappingURL=odontogram-category.entity.js.map