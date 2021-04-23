import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';;
import { NotificationCommand } from '../../Domain/NotificationCommand';
import { SlackRepository } from '../../../Slack/Infrastructure/slack.repository';
import { LoggerCustom } from '../../../Shared/Infrastructure/LoggerCustom';
import { SendgridAdapter } from '../../../Sendgrid/Infrastructure/SendgridAdapter';

@CommandHandler(NotificationCommand)
export class NotificationCommandHandler implements ICommandHandler<NotificationCommand> {
    constructor(
        private readonly _slackRepository: SlackRepository,
        private readonly _sendgridAdapter: SendgridAdapter,
        private readonly _publisher: EventPublisher,
        private readonly _logger: LoggerCustom
    ) { 
        this._logger.setContext(NotificationCommandHandler.name);
    }

    async execute(command: NotificationCommand) {
        this._logger.debug('NotificationCommand...');
        const { title, text } = command;

        const sendgrid = this._publisher.mergeObjectContext(
            await this._sendgridAdapter.sendEmail({
                text,
                title,
                from: 'edhine.ltda@gmail.com',
                from_name: 'Edhine',
                to: 'sergio.andres.orellana.roa@gmail.com'
                
            })
        );
    }
}
