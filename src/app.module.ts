import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { TokenService } from './token/token.service';

@Module({
    imports: [UserModule, PostModule, CommentModule, CarModule, AuthModule,],
    controllers: [AppController],
    providers: [AppService, TokenService],
})
export class AppModule {
}
