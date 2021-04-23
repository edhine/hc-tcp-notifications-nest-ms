import { SendgridDTO } from "./Sendgrid.dto";

export class SendEmailEvent {
    constructor(
        public readonly sendgridDto: SendgridDTO
    ) {}
}