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
exports.Address = exports.BrazilianStates = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
var BrazilianStates;
(function (BrazilianStates) {
    BrazilianStates["AC"] = "AC";
    BrazilianStates["AL"] = "AL";
    BrazilianStates["AP"] = "AP";
    BrazilianStates["AM"] = "AM";
    BrazilianStates["BA"] = "BA";
    BrazilianStates["CE"] = "CE";
    BrazilianStates["DF"] = "DF";
    BrazilianStates["ES"] = "ES";
    BrazilianStates["GO"] = "GO";
    BrazilianStates["MA"] = "MA";
    BrazilianStates["MT"] = "MT";
    BrazilianStates["MS"] = "MS";
    BrazilianStates["MG"] = "MG";
    BrazilianStates["PA"] = "PA";
    BrazilianStates["PB"] = "PB";
    BrazilianStates["PR"] = "PR";
    BrazilianStates["PE"] = "PE";
    BrazilianStates["PI"] = "PI";
    BrazilianStates["RJ"] = "RJ";
    BrazilianStates["RN"] = "RN";
    BrazilianStates["RS"] = "RS";
    BrazilianStates["RO"] = "RO";
    BrazilianStates["RR"] = "RR";
    BrazilianStates["SC"] = "SC";
    BrazilianStates["SP"] = "SP";
    BrazilianStates["SE"] = "SE";
    BrazilianStates["TO"] = "TO";
})(BrazilianStates || (exports.BrazilianStates = BrazilianStates = {}));
let Address = class Address {
    generateUuid() {
        this.uuid = (0, uuid_1.v4)();
    }
};
exports.Address = Address;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Address.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 36, unique: true, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Address.prototype, "generateUuid", null);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 9, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "complement", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BrazilianStates,
        nullable: false,
    }),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Address.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Address.prototype, "updated_at", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)('addresses')
], Address);
//# sourceMappingURL=address.entity.js.map