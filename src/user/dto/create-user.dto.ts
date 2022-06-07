import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Max, Min} from "class-validator";
import {RegEx} from "../../constants";

export class CreateUserDto {
    @Matches(RegEx.NAME_REGEX)
    public name: string

    @Matches(RegEx.EMAIL_REGEXP)
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNumber()
    @Min(18)
    @Max(100)
    public age: number;

    @IsString()
    public city: string;

    @Matches(RegEx.PASSWORD_REGEXP)
    @IsString()
    readonly password: string;

    @IsBoolean()
    public status: boolean;
}
