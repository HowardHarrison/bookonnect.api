import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/infrastructure/database/database.module';
import { AdminModule } from './core/infrastructure/admin/admin.module';
import { AuthModule } from './core/infrastructure/auth/auth.module';
import { BookModule } from './core/infrastructure/book/book.module';
import { ReactionModule } from './modules/reaction/reaction.module';
import { ReviewModule } from './modules/review/review.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    AdminModule,
    BookModule,
    ReactionModule,
    ReviewModule,
    UserModule,
  ],
})
export class AppModule {}
