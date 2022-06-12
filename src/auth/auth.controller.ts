import {Body, Controller, Post} from '@nestjs/common';
import {AuthUserDto} from "./dto/auth.user.dto";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../user/dto/create-user.dto";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/login')
    login(@Body() authDto: AuthUserDto) {
        return this.authService.login(authDto);
    }

    @Post('/registration')
    registration(@Body() createUserDto: CreateUserDto):Promise<any> {
        return this.authService.registration(createUserDto);
    }
}
