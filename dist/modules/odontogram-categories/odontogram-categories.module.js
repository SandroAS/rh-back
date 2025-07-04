"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdontogramCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const odontogram_category_entity_1 = require("../../entities/odontogram-category.entity");
const odontogram_categories_service_1 = require("./odontogram-categories.service");
const odontogram_categories_controller_1 = require("./odontogram-categories.controller");
let OdontogramCategoriesModule = class OdontogramCategoriesModule {
};
exports.OdontogramCategoriesModule = OdontogramCategoriesModule;
exports.OdontogramCategoriesModule = OdontogramCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([odontogram_category_entity_1.OdontogramCategory])
        ],
        providers: [odontogram_categories_service_1.OdontogramCategoriesService],
        controllers: [odontogram_categories_controller_1.OdontogramCategoriesController],
        exports: [odontogram_categories_service_1.OdontogramCategoriesService]
    })
], OdontogramCategoriesModule);
//# sourceMappingURL=odontogram-categories.module.js.map