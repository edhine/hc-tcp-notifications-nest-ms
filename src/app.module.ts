import { HttpModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationController } from './apps/Notifications/Controller/NotificationController';
import configuration from './config/configuration';
import { NotificationCommandHandler } from './Notifications/Notification/Application/commands/NotificationCommandHandler';
import { LoggerCustom } from './Notifications/Shared/Infrastructure/LoggerCustom';
import { SlackSendEventHandler } from './Notifications/Slack/Application/events/slack-send-message-event.handler';
import { SlackRepository } from './Notifications/Slack/Infrastructure/slack.repository';
import { SendgridAdapter } from './Notifications/Sendgrid/Infrastructure/SendgridAdapter';

export const CommandHandlers = [NotificationCommandHandler];
export const EventHandlers = [SlackSendEventHandler];

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
    SendgridAdapter,
    
    ...CommandHandlers,
    ...EventHandlers,


    LoggerCustom,
  ]
})
export class AppModule {}
