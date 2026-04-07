import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginUseCase } from '@application/auth/use-cases/login.use-case';
import { RegisterUseCase } from '@application/auth/use-cases/register.use-case';
import { USER_AUTH_REPOSITORY } from '@domain/auth/repositories/user-auth.repository';
import { AuthController } from '@presentation/auth.controller';
import { MongooseUserAuthRepository } from '../repositories/mongoose-user-auth.repository';
import { UserModel, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    MongooseUserAuthRepository,
    {
      provide: USER_AUTH_REPOSITORY,
      useExisting: MongooseUserAuthRepository,
    },
  ],
})
export class AuthModule {}
