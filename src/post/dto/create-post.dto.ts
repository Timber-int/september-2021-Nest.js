import {IsBoolean, IsNumber, IsString, MaxLength, MinLength} from "class-validator";

export class CreatePostDto {
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(250)
    content: string;

    @IsBoolean()
    published?: boolean;

    @IsNumber()
    authorId: number;
}
