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
exports.UpdateOdontogramCategoryDto = void 0;
const odontogram_category_entity_1 = require("../../../entities/odontogram-category.entity");
const class_validator_1 = require("class-validator");
class UpdateOdontogramCategoryDto {
}
exports.UpdateOdontogramCategoryDto = UpdateOdontogramCategoryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome da categoria é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'O nome da categoria deve ser uma string.' }),
    __metadata("design:type", String)
], UpdateOdontogramCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'A cor da categoria é obrigatória.' }),
    (0, class_validator_1.IsString)({ message: 'A cor deve ser uma string.' }),
    (0, class_validator_1.Matches)(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: 'A cor deve estar no formato HEX (ex: #RRGGBB ou #RGB).' }),
    __metadata("design:type", String)
], UpdateOdontogramCategoryDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O tipo da categoria é obrigatório.' }),
    (0, class_validator_1.IsEnum)(odontogram_category_entity_1.OdontogramCategoryType, { message: 'O tipo da categoria deve ser TOOTH ou FACE.' }),
    __metadata("design:type", String)
], UpdateOdontogramCategoryDto.prototype, "type", void 0);
//# sourceMappingURL=update-odontogram-category.dto.js.map