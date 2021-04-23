import { SendgridDTO } from "./Sendgrid.dto";

export interface ISendgridRepository {
    sendEmail(sengridDto: SendgridDTO);
}