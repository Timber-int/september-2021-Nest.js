import {IsNumber, IsString, Matches, Max, Min} from "class-validator";
import {RegEx} from "../../constants";

export class UpdateUserDto {
    @Matches(RegEx.NAME_REGEX)
    public name?: string

    @IsNumber()
    @Min(18)
    @Max(100)
    public age?: number;

    @IsString()
    public city?: string;
}
