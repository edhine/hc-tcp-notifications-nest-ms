import { ISlackRepository } from "../Domain/ISlack.repository";
import { Slack } from "../Domain/Slack";
import { SlackDTO } from "../Domain/Slack.dto";
import { Injectable } from "@nestjs/common";
import { LoggerCustom } from "../../Shared/Infrastructure/LoggerCustom";

@Injectable()
export class SlackRepository implements ISlackRepository {

    constructor(private readonly _logger: LoggerCustom) {
        this._logger.setContext(SlackRepository.name);
    }

    sendMessage(slackDto: SlackDTO) {
        this._logger.debug('SlackRepository...');

        const class_slack = new Slack();
        class_slack.slackData = slackDto;
        return class_slack;
    }

}