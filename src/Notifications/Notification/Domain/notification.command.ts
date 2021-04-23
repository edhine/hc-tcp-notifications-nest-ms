import { IsString } from "class-validator";

export class NotificationCommand {

    @IsString()
    readonly title!: string;
    
    @IsString()
    readonly text!: string;

    constructor(in_title: string, in_text: string) {
        this.title = in_title;
        this.text = in_text;
    }
}