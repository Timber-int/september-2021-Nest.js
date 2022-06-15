import {Module} from '@nestjs/common';
import {ChatService} from './chat.service';
import {ChatGetAway} from "./chat.getAway";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [AuthModule],
    providers: [ChatService, ChatGetAway,]
})
export class ChatModule {
}
