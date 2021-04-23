import { IsOptional, IsString } from "class-validator";

export class SendgridDTO {
    
    @IsString()
    readonly from!: string;
    
    @IsOptional()
    @IsString()
    readonly from_name!: string;

    @IsString()
    readonly to!: string;

    @IsString()
    readonly text!: string;

    @IsString()
    readonly title!: string;

    
}