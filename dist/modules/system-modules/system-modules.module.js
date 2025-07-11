"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemModulesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const system_module_entity_1 = require("../../entities/system-module.entity");
const system_modules_service_1 = require("./system-modules.service");
const system_modules_controller_1 = require("./system-modules.controller");
let SystemModulesModule = class SystemModulesModule {
};
exports.SystemModulesModule = SystemModulesModule;
exports.SystemModulesModule = SystemModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([system_module_entity_1.SystemModule])],
        providers: [system_modules_service_1.SystemModulesService],
        controllers: [system_modules_controller_1.SystemModulesController],
        exports: [system_modules_service_1.SystemModulesService],
    })
], SystemModulesModule);
//# sourceMappingURL=system-modules.module.js.map