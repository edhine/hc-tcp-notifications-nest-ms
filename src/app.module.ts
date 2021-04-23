import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationController } from './apps/Notifications/Controller/NotificationController';
import configuration from './config/configuration';
import { NotificationHandler } from './Notifications/Notification/Application/commands/NotificationHandler';
import { LoggerCustom } from './Notifications/Shared/Infrastructure/LoggerCustom';
import { SlackSendEventHandler } from './Notifications/Slack/Application/events/slack-send-message-event.handler';
import { SlackRepository } from './Notifications/Slack/Infrastructure/slack.repository';

export const CommandHandlers = [NotificationHandler];
export const EventHandlers = [SlackSendEventHandler];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    })
  ],
  controllers: [NotificationController],
  providers: [
    SlackRepository,
    
    ...CommandHandlers,
    ...EventHandlers,

    LoggerCustom,
  ]
})
export class AppModule {}
