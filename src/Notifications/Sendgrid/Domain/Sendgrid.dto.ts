import { IntersectionType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";
import { NotificationCommand } from "../../Notification/Domain/NotificationCommand";

class AdditionalSendgridDTO {
    
    @IsString()
    readonly from!: string;
    
    @IsOptional()
    @IsString()
    readonly from_name!: string;

    @IsString()
    readonly to!: string;
    
}

export class SendgridDTO extends IntersectionType(
    NotificationCommand,
    AdditionalSendgridDTO
) {}