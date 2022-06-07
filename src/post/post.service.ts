import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {PostContent, Prisma} from "@prisma/client";

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService,) {
    }

    getAllPosts(): Promise<PostContent[]> {
        return this.prismaService.postContent.findMany();
    }

    getPostById(postId: number): Promise<PostContent> {
        return this.prismaService.postContent.findUnique({where: {id: postId}, include: {comments: true}});
    }

    createPost(postBody: Prisma.PostContentCreateInput): Promise<PostContent> {
        return this.prismaService.postContent.create({data: postBody});
    }

    updatePostById(postDataToUpdate: Prisma.PostContentUpdateInput, postId: number): Promise<PostContent> {
        return this.prismaService.postContent.update({
            where: {id: postId},
            data: {content: postDataToUpdate.content}
        })
    }

    deletePostById(postId: number): Promise<PostContent> {
        return this.prismaService.postContent.delete({where: {id: postId}})
    }
}
