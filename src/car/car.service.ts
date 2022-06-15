import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Prisma, Car} from "@prisma/client";
import {CreateCarDto} from "./dto/create-car.dto";

@Injectable()
export class CarService {
    constructor(private prismaService: PrismaService) {
    }

    getAllCars(): Promise<Car[]> {
        return this.prismaService.car.findMany();
    }

    getCarById(carId: number): Promise<Car> {
        return this.prismaService.car.findUnique({where: {id: carId}});
    }

    createCar(carBody: Prisma.CarUncheckedCreateInput): Promise<Car> {
        return this.prismaService.car.create({data: carBody});
    }

    updateCarById(carDataToUpdate: Prisma.CarUpdateInput, carId: number): Promise<Car> {
        return this.prismaService.car.update({
            where: {id: carId},
            data: {price: carDataToUpdate.price, maxSpeed: carDataToUpdate.maxSpeed}
        })
    }

    deleteCarById(carId: number): Promise<Car> {
        return this.prismaService.car.delete({where: {id: carId}})
    }
}
