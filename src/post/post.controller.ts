import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostContent} from "@prisma/client";
import {UpdatePostDto} from "./dto/update-post.dto";
import {UserService} from "../user/user.service";

@ApiTags('posts')
@Controller('posts')
export class PostController {
    constructor(private postService: PostService, private userService: UserService) {
    }

    @ApiOperation({summary: 'Get all posts'})
    @ApiOkResponse({
        status: 200, schema: {
            example: [
                {
                    "id": 2,
                    "title": "Hello",
                    "content": "World",
                    "published": true,
                    "authorId": 1
                }
            ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/')
    getAllPosts(): Promise<PostContent[]> {
        return this.postService.getAllPosts();
    }

    @ApiOperation({summary: 'Get post by id'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                "id": 2,
                "title": "Hello",
                "content": "World",
                "published": true,
                "authorId": 1
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getPostById(@Param('id') id: string): Promise<PostContent> {
        return this.postService.getPostById(Number(id));
    }

    @ApiOperation({summary: 'Create post'})
    @ApiOkResponse({
        status: 201, schema: {
            example: {
                "id": 2,
                "title": "Hello",
                "content": "World",
                "published": true,
                "authorId": 1
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    async createPost(@Body() post: CreatePostDto): Promise<PostContent | string> {
        const author = await this.userService.getUserById(post.authorId);

        if (author) {
            return this.postService.createPost(post);
        }

        return 'Author not provided';
    }

    @ApiOperation({summary: 'Update post'})
    @ApiResponse({
        status: 200, schema: {
            example: {
                "id": 2,
                "title": "Hello",
                "content": "World",
                "published": true,
                "authorId": 1
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updatePostById(@Body() postDataToUpdate: UpdatePostDto, @Param('id') id: string): Promise<PostContent> {
        return this.postService.updatePostById(postDataToUpdate, Number(id));
    }

    @ApiOperation({summary: 'Delete post'})
    @ApiResponse({
        status: 200, schema: {
            example: {
                "id": 2,
                "title": "Hello",
                "content": "World",
                "published": true,
                "authorId": 1
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    deletePostById(@Param('id') id: string): Promise<PostContent> {
        return this.postService.deletePostById(Number(id));
    }

}
