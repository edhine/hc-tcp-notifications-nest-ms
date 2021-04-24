import { ISlackRepository } from "../Domain/ISlack.repository";
import { SlackDTO } from "../Domain/Slack.dto";
import { HttpService, Injectable } from "@nestjs/common";
import { LoggerCustom } from "../../Shared/Infrastructure/LoggerCustom";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SlackRepository implements ISlackRepository {

    constructor(
        private readonly _logger: LoggerCustom,
        private readonly _http: HttpService,
        private readonly _config: ConfigService
    ) {
        this._logger.setContext(SlackRepository.name);
        this._logger.verbose(`SLACK.TOKEN OK!`);
    }

    async sendMessage(slackDto: SlackDTO): Promise<any> {
        const URL_POST_MESSAGE = 'https://slack.com/api/chat.postMessage';
        this._logger.debug('SlackRepository...');

        const res = await this._http.post(URL_POST_MESSAGE, {
            channel: slackDto.channel,
            text: slackDto.text,
            username: this._config.get('SLACK.NAME_APP'),
            icon_emoji: slackDto.icon_emoji
        }, {
            headers: {
                authorization: `Bearer ${this._config.get('SLACK.TOKEN')}`
            }
        }).toPromise();

        return res;
    }

}