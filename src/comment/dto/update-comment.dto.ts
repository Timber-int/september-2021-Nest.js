import {IsString, Max, MaxLength, Min, MinLength} from "class-validator";

export class UpdateCommentDto {
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    text: string;
}
