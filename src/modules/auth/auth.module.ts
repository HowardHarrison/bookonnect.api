import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { USER_AUTH_REPOSITORY } from './domain/repositories/user-auth.repository';
import { MongooseUserAuthRepository } from './infrastructure/repositories/mongoose-user-auth.repository';
import { UserModel, UserSchema } from './infrastructure/schemas/user.schema';
import { AuthController } from './web/controllers/auth.controller';

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
