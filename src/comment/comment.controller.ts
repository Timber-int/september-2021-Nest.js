import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Comment} from "@prisma/client";
import {CommentService} from "./comment.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {PostService} from "../post/post.service";
import {UserService} from "../user/user.service";

@ApiTags('comments')
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService, private postService: PostService, private userService: UserService) {
    }

    @ApiOperation({summary: 'Get all comments'})
    @ApiOkResponse({
        status: 200, schema: {
            example: [
                {
                    "id": 2,
                    "text": "TYTTTT",
                    "published": false,
                    "authorId": 5,
                    "postId": 11
                }
            ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/')
    getAllComments(): Promise<Comment[]> {
        return this.commentService.getAllComments();
    }

    @ApiOperation({summary: 'Get comment by id'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                "id": 2,
                "text": "TYTTTT",
                "published": false,
                "authorId": 5,
                "postId": 11
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getCommentById(@Param('id') id: string): Promise<Comment> {
        return this.commentService.getCommentById(Number(id));
    }

    @ApiOperation({summary: 'Create comment'})
    @ApiOkResponse({
        status: 201, schema: {
            example:  {
                "id": 2,
                "text": "TYTTTT",
                "published": false,
                "authorId": 5,
                "postId": 11
            },
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    async createComment(@Body() comment: CreateCommentDto): Promise<Comment | string> {

        const author = await this.userService.getUserById(comment.authorId);
        const post = await this.postService.getPostById(comment.postId);

        if (!author) {
            return 'Author not provided';
        }

        if (!post) {
            return 'Post not provided';
        }

        return this.commentService.createComment(comment);
    }

    @ApiOperation({summary: 'Update comment'})
    @ApiResponse({
        status: 200, schema: {
            example:  {
                "id": 2,
                "text": "TYTTTT",
                "published": false,
                "authorId": 5,
                "postId": 11
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updateCommentById(@Body() commentDataToUpdate: UpdateCommentDto, @Param('id') id: string): Promise<Comment> {
        return this.commentService.updateCommentById(commentDataToUpdate, Number(id));
    }

    @ApiOperation({summary: 'Delete comment'})
    @ApiResponse({
        status: 200, schema: {
            example:  {
                "id": 2,
                "text": "TYTTTT",
                "published": false,
                "authorId": 5,
                "postId": 11
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    deleteCommentById(@Param('id') id: string): Promise<Comment> {
        return this.commentService.deleteCommentById(Number(id));
    }
}
