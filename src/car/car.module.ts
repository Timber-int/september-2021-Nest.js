import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import {PrismaService} from "../core/prisma.service";
import {UserService} from "../user/user.service";

@Module({
  controllers: [CarController],
  providers: [CarService, PrismaService, UserService]
})
export class CarModule {}
