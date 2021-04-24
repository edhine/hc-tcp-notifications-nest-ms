import { IntersectionType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { NotificationCommand } from "../../Notification/Domain/NotificationCommand";

class AdditionalSlackDTO {
    
    @IsString()
    readonly channel!: string;
    
    @IsString()
    readonly icon_emoji!: string;
    
}

export class SlackDTO extends IntersectionType(
    NotificationCommand,
    AdditionalSlackDTO
) {}