import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { LoggerCustom } from "../../../Shared/Infrastructure/LoggerCustom";
import { SendMessageEvent } from "../../Domain/SendMessageEvent";

@EventsHandler(SendMessageEvent)
export class SlackSendEventHandler implements IEventHandler<SendMessageEvent> {

    constructor(private readonly _logger: LoggerCustom) {
        this._logger.setContext(SlackSendEventHandler.name);
    }
    
    handle(event: SendMessageEvent) {
        let a = 0;
        for (let i = 0; i < 1000000000; i++) {
            a = a + 1;
        }
        this._logger.debug('Async SlackSendEventHandler...' + JSON.stringify(event.slackDto) + a);
    }
}