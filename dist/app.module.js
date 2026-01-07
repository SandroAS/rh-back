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
const event_emitter_1 = require("@nestjs/event-emitter");
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
const job_positions_levels_groups_module_1 = require("./modules/job-positions-levels-groups/job-positions-levels-groups.module");
const job_positions_levels_module_1 = require("./modules/job-positions-levels/job-positions-levels.module");
const teams_module_1 = require("./modules/teams/teams.module");
const team_members_module_1 = require("./modules/team-members/team-members.module");
const sectors_module_1 = require("./modules/sectors/sectors.module");
const drds_module_1 = require("./modules/drds/drds.module");
const drd_level_min_scores_module_1 = require("./modules/drd-level-min-scores/drd-level-min-scores.module");
const drd_metrics_module_1 = require("./modules/drd-metrics/drd-metrics.module");
const drd_levels_module_1 = require("./modules/drd-levels/drd-levels.module");
const drd_topic_items_module_1 = require("./modules/drd-topic-items/drd-topic-items.module");
const drd_topics_module_1 = require("./modules/drd-topics/drd-topics.module");
const forms_module_1 = require("./modules/forms/forms.module");
const form_questions_module_1 = require("./modules/form-questions/form-questions.module");
const form_question_options_module_1 = require("./modules/form-question-options/form-question-options.module");
const form_applications_module_1 = require("./modules/form-applications/form-applications.module");
const form_application_questions_module_1 = require("./modules/form-application-questions/form-application-questions.module");
const form_application_question_options_module_1 = require("./modules/form-application-question-options/form-application-question-options.module");
const evaluations_module_1 = require("./modules/evaluations/evaluations.module");
const evaluation_applications_module_1 = require("./modules/evaluation-applications/evaluation-applications.module");
const form_responses_module_1 = require("./modules/form-responses/form-responses.module");
const form_answers_module_1 = require("./modules/form-answers/form-answers.module");
const form_answer_multi_options_module_1 = require("./modules/form-answer-multi-options/form-answer-multi-options.module");
const form_topics_module_1 = require("./modules/form-topics/form-topics.module");
const form_application_topics_module_1 = require("./modules/form-application-topics/form-application-topics.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const account_seeds_module_1 = require("./modules/account-seeds/account-seeds.module");
const create_account_seed_command_command_1 = require("./commands/create-account-seed-command.command");
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
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
                newListener: false,
                removeListener: false,
                maxListeners: 20,
                verboseMemoryLeak: true,
                ignoreErrors: false,
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
            job_positions_module_1.JobPositionsModule,
            job_positions_levels_groups_module_1.JobPositionsLevelsGroupsModule,
            job_positions_levels_module_1.JobPositionsLevelsModule,
            teams_module_1.TeamsModule,
            team_members_module_1.TeamMembersModule,
            sectors_module_1.SectorsModule,
            drds_module_1.DrdsModule,
            drd_level_min_scores_module_1.DrdLevelMinScoresModule,
            drd_metrics_module_1.DrdMetricsModule,
            drd_levels_module_1.DrdLevelsModule,
            drd_topic_items_module_1.DrdTopicItemsModule,
            drd_topics_module_1.DrdTopicsModule,
            forms_module_1.FormsModule,
            form_questions_module_1.FormQuestionsModule,
            form_question_options_module_1.FormQuestionOptionsModule,
            form_applications_module_1.FormApplicationsModule,
            form_application_questions_module_1.FormApplicationQuestionsModule,
            form_application_question_options_module_1.FormApplicationQuestionOptionsModule,
            evaluations_module_1.EvaluationsModule,
            evaluation_applications_module_1.EvaluationApplicationsModule,
            form_responses_module_1.FormResponsesModule,
            form_answers_module_1.FormAnswersModule,
            form_answer_multi_options_module_1.FormAnswerMultiOptionsModule,
            form_topics_module_1.FormTopicsModule,
            form_application_topics_module_1.FormApplicationTopicsModule,
            notifications_module_1.NotificationsModule,
            account_seeds_module_1.AccountSeedsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true
                })
            },
            create_account_seed_command_command_1.CreateAccountSeedCommand,
        ]
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map