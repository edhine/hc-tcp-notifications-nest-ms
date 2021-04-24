import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationController } from './apps/Notifications/Controller/NotificationController';
import configuration from './config/configuration';
import { NotificationCommandHandler } from './Notifications/Notification/Application/commands/NotificationCommandHandler';
import { LoggerCustom } from './Notifications/Shared/Infrastructure/LoggerCustom';
import { SlackRepository } from './Notifications/Slack/Infrastructure/SlackRepository';
import { SendgridAdapterRepository } from './Notifications/Sendgrid/Infrastructure/SendgridAdapterRepository';

export const CommandHandlers = [NotificationCommandHandler];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),

    HttpModule
  ],
  controllers: [NotificationController],
  providers: [
    SlackRepository,
    SendgridAdapterRepository,
    
    ...CommandHandlers,

    LoggerCustom,
  ]
})
export class AppModule {}
