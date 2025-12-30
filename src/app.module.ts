import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PlansModule } from './modules/plans/plans.module';
import { TrialsModule } from './modules/trials/trials.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { SubscriptionChargesModule } from './modules/subscription-charges/subscription-charges.module';
import { PaymentIntentionsModule } from './modules/payment-intentions/payment-intentions.module';
import { AttemptChargesModule } from './modules/attempt-charges/attempt-charges.module';
import { SalesModule } from './modules/sales/sales.module';
import { UserMetasModule } from './modules/user-metas/user-metas.module';
import { SystemModulesModule } from './modules/system-modules/system-modules.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { JobPositionsModule } from './modules/job-positions/job-positions.module';
import { JobPositionsLevelsGroupsModule } from './modules/job-positions-levels-groups/job-positions-levels-groups.module';
import { JobPositionsLevelsModule } from './modules/job-positions-levels/job-positions-levels.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TeamMembersModule } from './modules/team-members/team-members.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { DrdsModule } from './modules/drds/drds.module';
import { DrdLevelMinScoresModule } from './modules/drd-level-min-scores/drd-level-min-scores.module';
import { DrdMetricsModule } from './modules/drd-metrics/drd-metrics.module';
import { DrdLevelsModule } from './modules/drd-levels/drd-levels.module';
import { DrdTopicItemsModule } from './modules/drd-topic-items/drd-topic-items.module';
import { DrdTopicsModule } from './modules/drd-topics/drd-topics.module';
import { FormsModule } from './modules/forms/forms.module';
import { FormQuestionsModule } from './modules/form-questions/form-questions.module';
import { FormQuestionOptionsModule } from './modules/form-question-options/form-question-options.module';
import { FormApplicationsModule } from './modules/form-applications/form-applications.module';
import { FormApplicationQuestionsModule } from './modules/form-application-questions/form-application-questions.module';
import { FormApplicationQuestionOptionsModule } from './modules/form-application-question-options/form-application-question-options.module';
import { EvaluationsModule } from './modules/evaluations/evaluations.module';
import { EvaluationApplicationsModule } from './modules/evaluation-applications/evaluation-applications.module';
import { FormResponsesModule } from './modules/form-responses/form-responses.module';
import { FormAnswersModule } from './modules/form-answers/form-answers.module';
import { FormAnswerMultiOptionsModule } from './modules/form-answer-multi-options/form-answer-multi-options.module';
import { FormTopicsModule } from './modules/form-topics/form-topics.module';
import { FormApplicationTopicsModule } from './modules/form-application-topics/form-application-topics.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CreateAccountSeedCommand } from './commands/create-account-seed-command.command';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        '.env'
      ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
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
    UsersModule,
    AuthModule,
    AccountsModule,
    RolesModule,
    PermissionsModule,
    PlansModule,
    TrialsModule,
    SubscriptionsModule,
    SubscriptionChargesModule,
    PaymentIntentionsModule,
    AttemptChargesModule,
    SalesModule,
    UserMetasModule,
    SystemModulesModule,
    CompaniesModule,
    AddressesModule,
    JobPositionsModule,
    JobPositionsLevelsGroupsModule,
    JobPositionsLevelsModule,
    TeamsModule,
    TeamMembersModule,
    SectorsModule,
    DrdsModule,
    DrdLevelMinScoresModule,
    DrdMetricsModule,
    DrdLevelsModule,
    DrdTopicItemsModule,
    DrdTopicsModule,
    FormsModule,
    FormQuestionsModule,
    FormQuestionOptionsModule,
    FormApplicationsModule,
    FormApplicationQuestionsModule,
    FormApplicationQuestionOptionsModule,
    EvaluationsModule,
    EvaluationApplicationsModule,
    FormResponsesModule,
    FormAnswersModule,
    FormAnswerMultiOptionsModule,
    FormTopicsModule,
    FormApplicationTopicsModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    },
    CreateAccountSeedCommand
  ]
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')]
        })
      )
      .forRoutes('*');
  }
}

