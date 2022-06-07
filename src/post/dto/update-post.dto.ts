import {IsString, MaxLength, MinLength} from "class-validator";

export class UpdatePostDto {
    @IsString()
    @MinLength(2)
    @MaxLength(250)
    content: string;
}
