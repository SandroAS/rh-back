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
exports.SystemModule = exports.SystemModuleName = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const account_entity_1 = require("./account.entity");
const service_entity_1 = require("./service.entity");
var SystemModuleName;
(function (SystemModuleName) {
    SystemModuleName["DENTISTRY"] = "DENTISTRY";
    SystemModuleName["PSYCHOLOGY"] = "PSYCHOLOGY";
    SystemModuleName["NUTRITION"] = "NUTRITION";
    SystemModuleName["PHYSIOTHERAPY"] = "PHYSIOTHERAPY";
})(SystemModuleName || (exports.SystemModuleName = SystemModuleName = {}));
let SystemModule = class SystemModule {
    generateUuid() {
        this.uuid = (0, uuid_1.v4)();
    }
};
exports.SystemModule = SystemModule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SystemModule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    __metadata("design:type", String)
], SystemModule.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemModule.prototype, "generateUuid", null);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SystemModuleName,
        unique: true,
    }),
    __metadata("design:type", String)
], SystemModule.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => account_entity_1.Account, (account) => account.systemModules),
    __metadata("design:type", Array)
], SystemModule.prototype, "accounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.Service, (service) => service.systemModule),
    __metadata("design:type", Array)
], SystemModule.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SystemModule.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], SystemModule.prototype, "updated_at", void 0);
exports.SystemModule = SystemModule = __decorate([
    (0, typeorm_1.Entity)('system_modules')
], SystemModule);
//# sourceMappingURL=system-module.entity.js.map