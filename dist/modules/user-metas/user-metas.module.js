"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMetasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_meta_entity_1 = require("../../entities/user-meta.entity");
const user_metas_service_1 = require("./user-metas.service");
const user_metas_controller_1 = require("./user-metas.controller");
let UserMetasModule = class UserMetasModule {
};
exports.UserMetasModule = UserMetasModule;
exports.UserMetasModule = UserMetasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_meta_entity_1.UserMeta])],
        providers: [user_metas_service_1.UserMetasService],
        controllers: [user_metas_controller_1.UserMetasController],
        exports: [user_metas_service_1.UserMetasService]
    })
], UserMetasModule);
//# sourceMappingURL=user-metas.module.js.map