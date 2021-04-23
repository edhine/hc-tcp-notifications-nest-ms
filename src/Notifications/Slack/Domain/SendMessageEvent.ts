import { SlackDTO } from "./Slack.dto";

export class SendMessageEvent {
    constructor(
        public readonly slackDto: SlackDTO
    ) {}
}