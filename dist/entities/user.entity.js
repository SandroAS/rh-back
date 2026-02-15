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
exports.User = exports.Gender = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
const account_entity_1 = require("./account.entity");
const payment_intention_entity_1 = require("./payment-intention.entity");
const sale_entity_1 = require("./sale.entity");
const role_entity_1 = require("./role.entity");
const user_meta_entity_1 = require("./user-meta.entity");
const company_entity_1 = require("./company.entity");
const address_entity_1 = require("./address.entity");
const job_position_entity_1 = require("./job-position.entity");
const job_position_level_entity_1 = require("./job-position-level.entity");
const job_positions_levels_group_entity_1 = require("./job-positions-levels-group.entity");
const team_entity_1 = require("./team.entity");
const team_member_entity_1 = require("./team-member.entity");
const sector_entity_1 = require("./sector.entity");
const drd_entity_1 = require("./drd.entity");
const evaluation_entity_1 = require("./evaluation.entity");
const evaluation_application_entity_1 = require("./evaluation-application.entity");
const notification_entity_1 = require("./notification.entity");
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));
let User = class User {
    generateUuid() {
        this.uuid = (0, uuid_1.v4)();
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "generateUuid", null);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "account_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.users, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'account_id' }),
    __metadata("design:type", account_entity_1.Account)
], User.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "cellphone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "google_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'profile_image_url' }),
    __metadata("design:type", String)
], User.prototype, "profile_img_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_intention_entity_1.PaymentIntention, intention => intention.user),
    __metadata("design:type", Array)
], User.prototype, "paymentIntentions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_entity_1.Sale, sale => sale.user),
    __metadata("design:type", Array)
], User.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, role => role.users),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_meta_entity_1.UserMeta, (userMeta) => userMeta.user),
    __metadata("design:type", Array)
], User.prototype, "userMetas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => company_entity_1.Company, company => company.user),
    __metadata("design:type", Array)
], User.prototype, "companies", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'address_id' }),
    __metadata("design:type", Number)
], User.prototype, "address_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.Address, { cascade: true, eager: true, onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'address_id' }),
    __metadata("design:type", address_entity_1.Address)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'job_position_id' }),
    __metadata("design:type", Number)
], User.prototype, "job_position_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_position_entity_1.JobPosition, (jobPosition) => jobPosition.users, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'job_position_id' }),
    __metadata("design:type", job_position_entity_1.JobPosition)
], User.prototype, "jobPosition", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_position_level_entity_1.JobPositionsLevel, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'job_positions_current_level_id' }),
    __metadata("design:type", job_position_level_entity_1.JobPositionsLevel)
], User.prototype, "jobPositionCurrentLevel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_positions_levels_group_entity_1.JobPositionsLevelsGroup, (jobPositionsLevelsGroup) => jobPositionsLevelsGroup.createdBy),
    __metadata("design:type", Array)
], User.prototype, "jobPositionsLevelsGroups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.Team, (team) => team.createdBy),
    __metadata("design:type", Array)
], User.prototype, "teams", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_member_entity_1.TeamMember, (teamMember) => teamMember.user),
    __metadata("design:type", Array)
], User.prototype, "teamMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sector_entity_1.Sector, (sector) => sector.createdBy),
    __metadata("design:type", Array)
], User.prototype, "sectors_created", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => sector_entity_1.Sector, (sector) => sector.users),
    __metadata("design:type", Array)
], User.prototype, "sectors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => drd_entity_1.DRD, (drd) => drd.createdBy),
    __metadata("design:type", Array)
], User.prototype, "created_drds", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evaluation_entity_1.Evaluation, (evaluation) => evaluation.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdEvaluations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evaluation_application_entity_1.EvaluationApplication, (application) => application.evaluatedUser),
    __metadata("design:type", Array)
], User.prototype, "evaluationsReceived", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evaluation_application_entity_1.EvaluationApplication, (application) => application.submittingUser),
    __metadata("design:type", Array)
], User.prototype, "evaluationsSubmitted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map