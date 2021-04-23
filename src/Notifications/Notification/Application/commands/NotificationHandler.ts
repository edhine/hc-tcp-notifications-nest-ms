import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';;
import { NotificationCommand } from '../../Domain/NotificationCommand';
import { SlackRepository } from '../../../Slack/Infrastructure/slack.repository';
import { LoggerCustom } from '../../../Shared/Infrastructure/LoggerCustom';

@CommandHandler(NotificationCommand)
export class NotificationHandler implements ICommandHandler<NotificationCommand> {
    constructor(
        private readonly _slackRepository: SlackRepository,
        private readonly _publisher: EventPublisher,
        private readonly _logger: LoggerCustom
    ) { 
        this._logger.setContext(NotificationHandler.name);
    }

    async execute(command: NotificationCommand) {
        this._logger.debug('NotificationCommand...');
        // console.log(clc.greenBright('NotificationCommand...'));
        const { title, text } = command;

        const slack = this._publisher.mergeObjectContext(
            await this._slackRepository.sendMessage({
                title,
                text,
                id: 'ID'
            })
        );

        slack.sendMessage();
        slack.commit();
    }
}
