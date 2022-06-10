import {IsEmail, IsNotEmpty, IsString, Matches} from "class-validator";
import {RegEx} from "../../constants";

export class AuthUserDto {

    @Matches(RegEx.EMAIL_REGEXP)
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @Matches(RegEx.PASSWORD_REGEXP)
    @IsString()
    readonly password: string;
}
