import { IsString } from "class-validator";

export class SlackDTO {
    
    @IsString()
    readonly id!: string;

    @IsString()
    readonly title!: string;

    @IsString()
    readonly text!: string;
    
}