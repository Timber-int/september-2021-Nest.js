import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "@prisma/client";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiOkResponse({
        status: 200, schema: {
            example: [
                {
                    "id": 1,
                    "email": "Jon@gmail.com",
                    "name": "Jon",
                    "city": "Kyiv",
                    "status": true,
                    "age": 20,
                    "password": "Hello@332%532"
                }
            ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                "id": 1,
                "email": "Jon@gmail.com",
                "name": "Jon",
                "city": "Kyiv",
                "status": true,
                "age": 20,
                "password": "Hello@332%532"
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(Number(id));
    }

    @ApiOperation({summary: 'Create user'})
    @ApiOkResponse({
        status: 201, schema: {
            example: {
                "id": 1,
                "email": "Jon@gmail.com",
                "name": "Jon",
                "city": "Kyiv",
                "status": true,
                "age": 20,
                "password": "Hello@332%532"
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.createUser(user);
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({
        status: 200, schema: {
            example: {
                "id": 1,
                "email": "Jon@gmail.com",
                "name": "Jon",
                "city": "Kyiv",
                "status": true,
                "age": 20,
                "password": "Hello@332%532"
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updateUserById(@Body() userDataToUpdate: UpdateUserDto, @Param('id') id: string): Promise<User> {
        return this.userService.updateUserById(userDataToUpdate, Number(id));
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({
        status: 200, schema: {
            example: {
                "id": 1,
                "email": "Jon@gmail.com",
                "name": "Jon",
                "city": "Kyiv",
                "status": true,
                "age": 20,
                "password": "Hello@332%532"
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    deleteUserById(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUserById(Number(id));
    }
}
