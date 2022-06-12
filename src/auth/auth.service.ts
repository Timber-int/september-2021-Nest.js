import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {CONSTANTS} from "../constants";
import {User} from "@prisma/client";
import {AuthUserDto} from "./dto/auth.user.dto";

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private userService: UserService) {
    }

    async login(authDto: AuthUserDto) {
        const user = await this._validateUser(authDto);
        return this._generateTokenPair(user);
    }

    async registration(userDto: CreateUserDto): Promise<any> {
        const userFromDB = await this.userService.getUserByEmail(userDto.email)

        if (userFromDB) {
            throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(userDto.password, CONSTANTS.HASH_SALT)

        const userWithHashPassword = {...userDto, password: hashedPassword}

        const user = await this.userService.createUser(userWithHashPassword)

        return this._generateTokenPair(user);
    }

    private _generateTokenPair(user: User) {
        const {id, email, name} = user;
        const payload = {id, email, name}

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload);

        return {
            accessToken,
            refreshToken,
        }

    }

    private async _validateUser(authUserDto: AuthUserDto) {

        const userFromDB = await this.userService.getUserByEmail(authUserDto.email);

        if (!userFromDB) {
            throw new HttpException('User doesn\'t', HttpStatus.BAD_REQUEST);
        }

        const isPasswordEqual = await bcrypt.compare(authUserDto.password, userFromDB.password)

        if (isPasswordEqual) {
            return userFromDB;
        }

        throw new UnauthorizedException({message: 'Wrong email or password'});
    }

}
