import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserModel, UserSchema } from '../auth/infrastructure/schemas/user.schema';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { ToggleSavedBookUseCase } from './application/use-cases/toggle-saved-book.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { MongooseUserRepository } from './infrastructure/repositories/mongoose-user.repository';
import { UserController } from './web/controllers/user.controller';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    AuthGuard,
    GetUserByIdUseCase,
    ToggleSavedBookUseCase,
    UpdateUserUseCase,
    MongooseUserRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: MongooseUserRepository,
    },
  ],
})
export class UserModule {}
