"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrialsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trial_entity_1 = require("../../entities/trial.entity");
const trials_service_1 = require("./trials.service");
const trials_controller_1 = require("./trials.controller");
let TrialsModule = class TrialsModule {
};
exports.TrialsModule = TrialsModule;
exports.TrialsModule = TrialsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trial_entity_1.Trial])],
        providers: [trials_service_1.TrialsService],
        controllers: [trials_controller_1.TrialsController],
        exports: [trials_service_1.TrialsService],
    })
], TrialsModule);
//# sourceMappingURL=trials.module.js.map