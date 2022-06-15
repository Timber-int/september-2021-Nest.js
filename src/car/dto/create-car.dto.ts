import {IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength} from "class-validator";
import {RegEx} from "../../constants";

export class CreateCarDto {
    @Matches(RegEx.NAME_REGEX)
    public model: string;

    @IsNumber()
    @Min(1990)
    @Max(new Date().getFullYear())
    public year: number;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    public country: string;

    @IsNumber()
    @Min(1000)
    @Max(1000000)
    public price: number;

    @IsNumber()
    @Min(0)
    @Max(400)
    public maxSpeed: number;

    @IsNumber()
    public ownerId: number;

}
