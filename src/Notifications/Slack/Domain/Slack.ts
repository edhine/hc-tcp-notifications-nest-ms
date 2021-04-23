import { AggregateRoot } from "@nestjs/cqrs";
import { SlackDTO } from "./Slack.dto";
import { SendMessageEvent } from "./SendMessageEvent";

export class Slack extends AggregateRoot {

    _slack_data: SlackDTO;

    set slackData(in_slack_data) {
        this._slack_data = in_slack_data;
    }

    sendMessage() {
        this.apply(new SendMessageEvent(this._slack_data));
    }
}