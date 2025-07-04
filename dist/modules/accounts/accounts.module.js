"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../../entities/account.entity");
const accounts_service_1 = require("./accounts.service");
const accounts_controller_1 = require("./accounts.controller");
const system_modules_module_1 = require("../system-modules/system-modules.module");
const minio_module_1 = require("../../minio/minio.module");
const users_module_1 = require("../users/users.module");
const roles_module_1 = require("../roles/roles.module");
let AccountsModule = class AccountsModule {
};
exports.AccountsModule = AccountsModule;
exports.AccountsModule = AccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account]),
            system_modules_module_1.SystemModulesModule,
            minio_module_1.MinioModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
        ],
        providers: [accounts_service_1.AccountsService],
        controllers: [accounts_controller_1.AccountsController],
        exports: [accounts_service_1.AccountsService],
    })
], AccountsModule);
//# sourceMappingURL=accounts.module.js.map