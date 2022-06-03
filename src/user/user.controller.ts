import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UserService} from "./user.service";
import {UserDto} from "./dto/user.dto";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get('/')
    getUsers(): UserDto[] {
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUserById(@Param('id') id: string): UserDto {
        return this.userService.getUserById(id);
    }

    @Post('/')
    createUser(@Body() userDto: CreateUserDto): UserDto {
        return this.userService.createUser(userDto);
    }

    @Delete('/:id')
    deleteUserById(@Param('id') id: string): string {
        return this.userService.deleteUserById(id);
    }

    @Put('/:id')
    updateUserById(@Param('id') id: string, @Body() userBodyUpdateDto: UpdateUserDto): UserDto | string {
        if (userBodyUpdateDto.password && userBodyUpdateDto.password.length){
        return this.userService.updateUserById(id, userBodyUpdateDto);
        }
        return 'Not data to update';
    }
}
