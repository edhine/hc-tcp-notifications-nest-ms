import { MailService } from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { LoggerCustom } from '../../Shared/Infrastructure/LoggerCustom';
import { Injectable } from '@nestjs/common';
import { ISendgridRepository } from '../Domain/ISendgrid.repository';
import { SendgridDTO } from '../Domain/Sendgrid.dto';

@Injectable()
export class SendgridAdapterRepository extends MailService implements ISendgridRepository {

    constructor(
        private readonly _config: ConfigService,
        private readonly _logger: LoggerCustom
    ) {
        super();
        this._logger.setContext(SendgridAdapterRepository.name);
        this.setApiKey(this._config.get('SENDGRID.API_KEY'));
        this._logger.verbose(`SENDGRID.API_KEY OK!`);
    }

    async sendEmail(sendgridDto: SendgridDTO): Promise<any> {
        return await this.send({
            text: sendgridDto.text,
            from: { email: sendgridDto.from, name: sendgridDto.from_name },
            to: sendgridDto.to,
            subject: sendgridDto.title
        }).catch(err => {
            console.log('err', err.response.body);
        });
    }
}