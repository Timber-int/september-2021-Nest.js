import {Injectable} from '@nestjs/common';

import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {

    private users: UserDto[] = []

    getUsers(): UserDto[] {
        return this.users
    }

    getUserById(id: string): UserDto {
        return this.users.find(user => user.id === id)
    }

    createUser(userDto: CreateUserDto): UserDto {
        const user = {
            id: String(new Date().getTime()),
            ...userDto,
        }
        this.users.push(user);
        return user;
    }

    deleteUserById(id: string): string {
        this.users = this.users.filter(user => user.id !== id);
        return `User ${id} id successfully deleted`;
    }

    updateUserById(id: string, bodyToUpdate: UpdateUserDto): UserDto {
        this.users = this.users.map(user => user.id === id ? {...user, password: bodyToUpdate.password} : user);
        const user = this.users.find(user => user.id === id);
        return user;
    }
}
