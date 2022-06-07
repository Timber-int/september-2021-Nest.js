import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Car} from "@prisma/client";
import {CarService} from "./car.service";
import {CreateCarDto} from "./dto/create-car.dto";
import {UpdateCarDto} from "./dto/update-car.dto";

@ApiTags('cars')
@Controller('cars')
export class CarController {
    constructor(private carService: CarService, private userService: UserService) {
    }

    @ApiOperation({summary: 'Get all cars'})
    @ApiOkResponse({
        status: 200, schema: {
            example: [
                {
                    "id": 2,
                    "model": "Audi",
                    "year": 2005,
                    "country": "GM",
                    "price": 3000,
                    "maxSpeed": 300,
                    "ownerId": 1
                }
            ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/')
    getAllCars(): Promise<Car[]> {
        return this.carService.getAllCars();
    }

    @ApiOperation({summary: 'Get car by id'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                "id": 2,
                "model": "Audi",
                "year": 2005,
                "country": "GM",
                "price": 3000,
                "maxSpeed": 300,
                "ownerId": 1
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getCarById(@Param('id') id: string): Promise<Car> {
        return this.carService.getCarById(Number(id));
    }

    @ApiOperation({summary: 'Create car'})
    @ApiOkResponse({
        status: 201, schema: {
            example: {
                "id": 2,
                "model": "Audi",
                "year": 2005,
                "country": "GM",
                "price": 3000,
                "maxSpeed": 300,
                "ownerId": 1
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    async createCar(@Body() car: CreateCarDto): Promise<CreateCarDto | string> {
        const ownerCar = await this.userService.getUserById(car.ownerId);

        if (ownerCar) {
            return this.carService.createCar(car);
        }

        return 'Owner not provided';
    }

    @ApiOperation({summary: 'Update car'})
    @ApiResponse({
        status: 200, schema: {
            example: {
                "id": 2,
                "model": "Audi",
                "year": 2005,
                "country": "GM",
                "price": 3000,
                "maxSpeed": 300,
                "ownerId": 1
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updateCarById(@Body() carDataToUpdate: UpdateCarDto, @Param('id') id: string): Promise<Car> {
        return this.carService.updateCarById(carDataToUpdate, Number(id));
    }

    @ApiOperation({summary: 'Delete car'})
    @ApiResponse({
        status: 200, schema: {
            example: {
                "id": 2,
                "model": "Audi",
                "year": 2005,
                "country": "GM",
                "price": 3000,
                "maxSpeed": 300,
                "ownerId": 1
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    deleteCarById(@Param('id') id: string): Promise<Car> {
        return this.carService.deleteCarById(Number(id));
    }
}
