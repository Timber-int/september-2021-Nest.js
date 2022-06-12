import { forwardRef, Module } from "@nestjs/common";
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {PrismaService} from "../core/prisma.service";
import {AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService,JwtService],
    imports: [
        forwardRef(() =>(AuthModule))],
})
export class UserModule {
}
