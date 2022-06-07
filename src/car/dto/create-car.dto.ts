import {IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength} from "class-validator";
import {RegEx} from "../../constants";

export class CreateCarDto {
    @Matches(RegEx.NAME_REGEX)
    model: string;

    @IsNumber()
    @Min(1990)
    @Max(new Date().getFullYear())
    year: number;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    country: string;

    @IsNumber()
    @Min(1000)
    @Max(1000000)
    price: number;

    @IsNumber()
    @Min(0)
    @Max(400)
    maxSpeed: number;

    @IsNumber()
    ownerId: number;
}
