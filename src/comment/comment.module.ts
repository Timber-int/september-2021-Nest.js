import {Module} from '@nestjs/common';
import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {PrismaService} from "../core/prisma.service";
import {UserService} from "../user/user.service";
import {PostService} from "../post/post.service";

@Module({
    controllers: [CommentController],
    providers: [CommentService, PrismaService, UserService, PostService]
})
export class CommentModule {
}
