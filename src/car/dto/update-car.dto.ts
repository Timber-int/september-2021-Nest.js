import {IsNumber, Max, Min} from "class-validator";

export class UpdateCarDto {
    @IsNumber()
    @Min(1000)
    @Max(1000000)
    price: number;

    @IsNumber()
    @Min(0)
    @Max(400)
    maxSpeed: number;
}
