import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import {AuthService} from "../auth/auth.service";
import {UnauthorizedException} from "@nestjs/common";

@WebSocketGateway({
    pingTimeout: 60000,
})

export class ChatGetAway {
    @WebSocketServer()
    server: Server

    constructor(private readonly authService: AuthService) {

    }

    @SubscribeMessage('join')
    async joinRoom(client: Socket, data: { token: string }) {
        const userId = await this.authService.getVerifiedUseId(data.token)
        if (!userId) {
            throw new UnauthorizedException({
                message: 'Not Authorization',
            })
        }
    }
}
