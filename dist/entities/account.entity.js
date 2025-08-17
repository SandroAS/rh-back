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
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_entity_1 = require("./user.entity");
const plan_entity_1 = require("./plan.entity");
const subscription_entity_1 = require("./subscription.entity");
const trial_entity_1 = require("./trial.entity");
const payment_intention_entity_1 = require("./payment-intention.entity");
const sale_entity_1 = require("./sale.entity");
const system_module_entity_1 = require("./system-module.entity");
const job_position_entity_1 = require("./job-position.entity");
let Account = class Account {
    generateUuid() {
        this.uuid = (0, uuid_1.v4)();
    }
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    __metadata("design:type", String)
], Account.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Account.prototype, "generateUuid", null);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Account.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'admin_id' }),
    __metadata("design:type", user_entity_1.User)
], Account.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.account),
    __metadata("design:type", Array)
], Account.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", plan_entity_1.Plan)
], Account.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "current_subscription_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => subscription_entity_1.Subscription, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'current_subscription_id' }),
    __metadata("design:type", subscription_entity_1.Subscription)
], Account.prototype, "currentSubscription", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.Subscription, (sub) => sub.account),
    __metadata("design:type", Array)
], Account.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trial_entity_1.Trial, (trial) => trial.account),
    __metadata("design:type", Array)
], Account.prototype, "trials", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => trial_entity_1.Trial, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'last_trial_id' }),
    __metadata("design:type", trial_entity_1.Trial)
], Account.prototype, "lastTrial", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "last_trial_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Account.prototype, "in_trial", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_entity_1.Sale, (sale) => sale.account),
    __metadata("design:type", Array)
], Account.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_intention_entity_1.PaymentIntention, intention => intention.account),
    __metadata("design:type", Array)
], Account.prototype, "paymentIntentions", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => system_module_entity_1.SystemModule, (systemModule) => systemModule.accounts),
    (0, typeorm_1.JoinTable)({
        name: 'account_has_system_modules',
        joinColumn: {
            name: 'account_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'system_module_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Account.prototype, "systemModules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_position_entity_1.JobPosition, (jobPosition) => jobPosition.account),
    __metadata("design:type", Array)
], Account.prototype, "jobPositions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Account.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Account.prototype, "updated_at", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)('accounts')
], Account);
//# sourceMappingURL=account.entity.js.map