import { Injectable } from '@nestjs/common';
import {Comment, Prisma} from "@prisma/client";
import {PrismaService} from "../core/prisma.service";

@Injectable()
export class CommentService {
    constructor(private prismaService: PrismaService) {
    }

    getAllComments(): Promise<Comment[]> {
        return this.prismaService.comment.findMany();
    }

    getCommentById(commentId: number): Promise<Comment> {
        return this.prismaService.comment.findUnique({where: {id: commentId}});
    }

    createComment(commentBody: Prisma.CommentCreateInput): Promise<Comment> {
        return this.prismaService.comment.create({data: commentBody});
    }

    updateCommentById(commentDataToUpdate: Prisma.CommentUpdateInput, commentId: number): Promise<Comment> {
        return this.prismaService.comment.update({
            where: {id: commentId},
            data: {text: commentDataToUpdate.text}
        })
    }

    deleteCommentById(commentId: number): Promise<Comment> {
        console.log(commentId)
        return this.prismaService.comment.delete({where: {id: commentId}})
    }
}
