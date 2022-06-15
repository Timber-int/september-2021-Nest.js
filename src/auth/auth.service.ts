import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {CONSTANTS} from "../constants";
import {User} from "@prisma/client";
import {AuthUserDto} from "./dto/auth.user.dto";
import {PrismaService} from "../core/prisma.service";
import {IToken} from "./interface/tokenInterface";

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private userService: UserService, private prismaService: PrismaService) {
    }

    async login(authDto: AuthUserDto): Promise<Promise<IToken>> {
        const user = await this._validateUser(authDto);
        const tokenPair = await this._generateTokenPair(user);
        const {accessToken, refreshToken, userId} = tokenPair;
        await this._saveTokenPairToDB(accessToken, refreshToken, userId);
        return tokenPair;
    }

    async registration(userDto: CreateUserDto): Promise<Promise<IToken>> {
        const userFromDB = await this.userService.getUserByEmail(userDto.email)

        if (userFromDB) {
            throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(userDto.password, CONSTANTS.HASH_SALT)

        const userWithHashPassword = {...userDto, password: hashedPassword}

        const user = await this.userService.createUser(userWithHashPassword)

        const tokenPair = await this._generateTokenPair(user);
        const {accessToken, refreshToken, userId} = tokenPair;
        await this._saveTokenPairToDB(accessToken, refreshToken, userId);
        return tokenPair
    }

    private _generateTokenPair(user: User): IToken {
        const {id, email, name} = user;
        const payload = {id, email, name}

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload);

        return {
            accessToken,
            refreshToken,
            userId: id,
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

    private async _saveTokenPairToDB(accessToken: string, refreshToken: string, userId: number): Promise<IToken> {
        const tokenFromDB = await this.prismaService.token.findUnique({where: {userId}});

        if (tokenFromDB) {
            return this.prismaService.token.update({
                where: {userId},
                data: {accessToken: accessToken, refreshToken: refreshToken}
            })
        }

        return this.prismaService.token.create({data: {accessToken, refreshToken, userId}});
    }

    async getVerifiedUseId(jwt: string): Promise<string | null> {
        try {
            const token = this.getTokenFromJwt(jwt);
            const user = await this.jwtService.verify(token, {
                publicKey: 'Secret',
            });

            return user.id;
        } catch (e) {
            console.log(e);
        }
    }

    private getTokenFromJwt(jwt:string) {
        return jwt.split(' ')[1]
    }


}
