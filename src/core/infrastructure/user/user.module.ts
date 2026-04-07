import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetUserByIdUseCase } from '@application/user/use-cases/get-user-by-id.use-case';
import { ToggleSavedBookUseCase } from '@application/user/use-cases/toggle-saved-book.use-case';
import { UpdateUserUseCase } from '@application/user/use-cases/update-user.use-case';
import { USER_REPOSITORY } from '@domain/user/repositories/user.repository';
import { UserController } from '@presentation/user.controller';
import { MongooseUserRepository } from '../repositories/mongoose-user.repository';
import { UserModel, UserSchema } from '../schemas/user.schema';

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
