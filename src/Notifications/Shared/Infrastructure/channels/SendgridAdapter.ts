import { ClientResponse } from '@sendgrid/client/src/response';
import { ResponseError } from '@sendgrid/helpers/classes';
import { MailData, MailContent } from '@sendgrid/helpers/classes/mail';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { LoggerCustom } from '../LoggerCustom';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendgridAdapter extends MailService {

    constructor(
        private readonly _config: ConfigService,
        private readonly _logger: LoggerCustom
    ) {
        super();
        this.setApiKey(this._config.get('SENDGRID.API_KEY'));
        this._logger.verbose(`SENDGRID.API_KEY OK!`, 'SendgridAdapter');
	}
    
    send(data: (MailData & { text: string; }) | (MailData & { html: string; }) | (MailData & { templateId: string; }) | (MailData & { content: MailContent[] & { 0: MailContent; }; }) | MailDataRequired[], isMultiple?: boolean, cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]> {
        return this.send(data);        
    }
}