import {IsNumber, IsOptional, IsString, Matches, Max, Min} from "class-validator";
import {RegEx} from "../../constants";

export class UpdateUserDto {
    @Matches(RegEx.NAME_REGEX)
    public name: string

    @IsString()
    public city: string;

    public avatar: string;
}
