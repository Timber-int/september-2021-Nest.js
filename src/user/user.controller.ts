import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put, Res, UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "@prisma/client";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from 'src/auth/jwt.auth.guard';
import {FileInterceptor} from '@nestjs/platform-express/multer';
import {diskStorage} from "multer";
import {imageFileFilter} from "../utils/image.filter";

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
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: './avatar',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');

                    return cb(null, `${randomName}${file.originalname}`);
                },
            }),
            fileFilter: imageFileFilter,
        }),
    )
    updateUser(
        @Body() userData: UpdateUserDto,
        @Param('id') id: string,
        @UploadedFile() avatar: Express.Multer.File,
    ) {
        let newAvatarPath: string = null;
        try {
            if (avatar) {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');

                newAvatarPath = `avatar/${randomName}${avatar.originalname}`;
            }

            userData.avatar = newAvatarPath;
            return this.userService.updateUserById(userData, Number(id));
        } catch (e) {
            console.log(e);
        }
    }
    @Get('/avatar/:image')
    watchFile(@Param('image') image, @Res() res) {
        return res.sendFile(image, { root: './avatar' });
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
    @UseGuards(AuthGuard)
    deleteUserById(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUserById(Number(id));
    }
}
