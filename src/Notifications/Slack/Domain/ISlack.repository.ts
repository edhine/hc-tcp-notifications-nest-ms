import { SlackDTO } from "./Slack.dto";

export interface ISlackRepository {
    sendMessage(slackDto: SlackDTO);
}