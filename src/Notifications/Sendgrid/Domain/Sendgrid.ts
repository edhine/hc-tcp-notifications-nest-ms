import { AggregateRoot } from "@nestjs/cqrs";
import { SendgridDTO } from "./Sendgrid.dto";

export class Sendgrid extends AggregateRoot {

    _sendgrid_data: SendgridDTO;

    set sendgridData(in_sendgrid_data) {
        this._sendgrid_data = in_sendgrid_data;
    }
}