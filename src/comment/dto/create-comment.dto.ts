import {IsBoolean, IsNumber, IsString, Max, MaxLength, Min, MinLength} from "class-validator";

export class CreateCommentDto {
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    text: string;

    @IsBoolean()
    published?: boolean;

    @IsNumber()
    authorId: number;

    @IsNumber()
    postId: number;
}
