import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthUserDto} from "./dto/auth.user.dto";
import {AuthService} from "./auth.service";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../user/dto/create-user.dto";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Login'})
    @ApiOkResponse({
        status: 201, schema: {
            example: {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImVtYWlsIjoiUFBkc25mc2pkZGtkeUBnbWFpbC5jb20iLCJuYW1lIjoiTGlhIiwiaWF0IjoxNjU1MDk4MzQyLCJleHAiOjE2NTUxODQ3NDJ9.P5PWxTtv0Gp1bquyoVt7dBBCCf37Xv-2vGGGhfSXVw4",
                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImVtYWlsIjoiUFBkc25mc2pkZGtkeUBnbWFpbC5jb20iLCJuYW1lIjoiTGlhIiwiaWF0IjoxNjU1MDk4MzQyLCJleHAiOjE2NTUxODQ3NDJ9.P5PWxTtv0Gp1bquyoVt7dBBCCf37Xv-2vGGGhfSXVw4"
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/login')
    login(@Body() authDto: AuthUserDto) {
        return this.authService.login(authDto);
    }

    @ApiOperation({summary: 'Registration'})
    @ApiOkResponse({
        status: 201, schema: {
            example: {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImVtYWlsIjoiUFBkc25mc2pkZGtkeUBnbWFpbC5jb20iLCJuYW1lIjoiTGlhIiwiaWF0IjoxNjU1MDk4MzQyLCJleHAiOjE2NTUxODQ3NDJ9.P5PWxTtv0Gp1bquyoVt7dBBCCf37Xv-2vGGGhfSXVw4",
                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImVtYWlsIjoiUFBkc25mc2pkZGtkeUBnbWFpbC5jb20iLCJuYW1lIjoiTGlhIiwiaWF0IjoxNjU1MDk4MzQyLCJleHAiOjE2NTUxODQ3NDJ9.P5PWxTtv0Gp1bquyoVt7dBBCCf37Xv-2vGGGhfSXVw4"
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/registration')
    async registration(@Body() createUserDto: CreateUserDto): Promise<any> {
        const tokenPair = await this.authService.registration(createUserDto);

        return tokenPair;
    }
}
