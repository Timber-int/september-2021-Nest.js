import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

import {PostService} from "./post.service";
import {PostDto} from "./dto/post.dto";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";

@Controller('posts')
export class PostController {

    constructor(private postService: PostService) {
    }

    @Get('/')
    GetPosts() {
        return this.postService.getPosts();
    }

    @Get('/:id')
    getPostById(@Param('id') id: string): PostDto {
        return this.postService.getPostById(id);
    }

    @Post('/')
    createPost(@Body() postBody: CreatePostDto): PostDto {
        return this.postService.createPost(postBody);
    }

    @Delete('/:id')
    deletePostById(@Param('id') id: string): string {
        return this.postService.deletePostById(id);
    }

    @Put('/:id')
    updatePostById(@Param('id') id: string, @Body() postBodyUpdateDto: UpdatePostDto): PostDto | string {
        if (postBodyUpdateDto.text && postBodyUpdateDto.text.length) {
            return this.postService.updatePostById(id, postBodyUpdateDto);
        }
        return 'Not data to update';
    }
}
