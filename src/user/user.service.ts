import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Prisma, User} from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {

    }

    getAllUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    getUserById(userId: number): Promise<User> {
        return this.prismaService.user.findUnique({where: {id: userId}, include: {posts: true}});
    }

    getUserByEmail(userEmail: string): Promise<User> {
        return this.prismaService.user.findUnique({where: {email: userEmail}});
    }

    async createUser(userBody: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({data: userBody});
    }

    updateUserById(userDataToUpdate: Prisma.UserUpdateInput, userId: number): Promise<User> {
        return this.prismaService.user.update({
            where: {id: userId},
            data: {name: userDataToUpdate.name, city: userDataToUpdate.city, avatar: userDataToUpdate.avatar}
        })
    }

    deleteUserById(userId: number): Promise<User> {
        return this.prismaService.user.delete({where: {id: userId}})
    }

}
