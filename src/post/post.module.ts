import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {PrismaService} from "../core/prisma.service";
import {UserService} from "../user/user.service";

@Module({
  providers: [PostService, PrismaService,UserService],
  controllers: [PostController]
})
export class PostModule {}
