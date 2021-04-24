import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';;
import { NotificationCommand } from '../../Domain/NotificationCommand';
import { LoggerCustom } from '../../../Shared/Infrastructure/LoggerCustom';
import { SendgridAdapterRepository } from '../../../Sendgrid/Infrastructure/SendgridAdapterRepository';
import { SlackRepository } from '../../../Slack/Infrastructure/SlackRepository';

@CommandHandler(NotificationCommand)
export class NotificationCommandHandler implements ICommandHandler<NotificationCommand> {
    constructor(
        private readonly _sendgridAdapter: SendgridAdapterRepository,
        private readonly _slackRepository: SlackRepository,
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

        const slack = this._publisher.mergeObjectContext(
            await this._slackRepository.sendMessage({
                text,
                title,
                channel: '#general',
                icon_emoji: ':+1:'  
            })
        );
    }
}
