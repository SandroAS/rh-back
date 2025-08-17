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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const accounts_module_1 = require("./modules/accounts/accounts.module");
const roles_module_1 = require("./modules/roles/roles.module");
const permissions_module_1 = require("./modules/permissions/permissions.module");
const plans_module_1 = require("./modules/plans/plans.module");
const trials_module_1 = require("./modules/trials/trials.module");
const subscriptions_module_1 = require("./modules/subscriptions/subscriptions.module");
const subscription_charges_module_1 = require("./modules/subscription-charges/subscription-charges.module");
const payment_intentions_module_1 = require("./modules/payment-intentions/payment-intentions.module");
const attempt_charges_module_1 = require("./modules/attempt-charges/attempt-charges.module");
const sales_module_1 = require("./modules/sales/sales.module");
const user_metas_module_1 = require("./modules/user-metas/user-metas.module");
const system_modules_module_1 = require("./modules/system-modules/system-modules.module");
const companies_module_1 = require("./modules/companies/companies.module");
const addresses_module_1 = require("./modules/addresses/addresses.module");
const job_positions_module_1 = require("./modules/job-positions/job-positions.module");
const cookieSession = require('cookie-session');
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
    }
    configure(consumer) {
        consumer
            .apply(cookieSession({
            keys: [this.configService.get('COOKIE_KEY')]
        }))
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [
                    `.env.${process.env.NODE_ENV}`,
                    '.env'
                ]
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: parseInt(configService.get('DB_PORT'), 10),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    autoLoadEntities: true,
                    synchronize: false
                })
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            accounts_module_1.AccountsModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            plans_module_1.PlansModule,
            trials_module_1.TrialsModule,
            subscriptions_module_1.SubscriptionsModule,
            subscription_charges_module_1.SubscriptionChargesModule,
            payment_intentions_module_1.PaymentIntentionsModule,
            attempt_charges_module_1.AttemptChargesModule,
            sales_module_1.SalesModule,
            user_metas_module_1.UserMetasModule,
            system_modules_module_1.SystemModulesModule,
            companies_module_1.CompaniesModule,
            addresses_module_1.AddressesModule,
            job_positions_module_1.JobPositionsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true
                })
            }
        ]
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map