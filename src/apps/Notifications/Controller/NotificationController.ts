import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { NotificationCommand } from '../../../Notifications/Notification/Domain/Notification.command';
import { LoggerCustom } from '../../../Notifications/Shared/Infrastructure/LoggerCustom';

@Controller()
export class NotificationController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _logger: LoggerCustom
  ) {
    this._logger.setContext(NotificationController.name);
  }

  @EventPattern('message_printed')
  async handleSendNotification(data: Record<string, unknown>) {
    this._logger.debug('handleSendNotification...');

    const id = '312312';
    this._commandBus.execute(new NotificationCommand('Titulo','Text'));
  }


  @MessagePattern({ cmd: 'send' })
  async handleMessagePrintedSend(data: Record<string, unknown>) {
    console.log('Send:', data.text);
    return data.text;
    // return (data || []).reduce((a, b) => a + b);
  }
}
