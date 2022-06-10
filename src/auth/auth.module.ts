import {Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PrismaService} from "../core/prisma.service";
import {CONSTANTS} from "../constants";

@Module({
    controllers: [AuthController,],
    providers: [AuthService, UserService, JwtService, PrismaService],
    imports: [JwtModule.register({
        secret: CONSTANTS.SECRET_KEY,
        signOptions: {
            expiresIn: CONSTANTS.EXPIRES_IN
        }
    })],
    exports: [AuthService]
})
export class AuthModule {
}
