import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminLoginUseCase } from './application/use-cases/admin-login.use-case';
import { ADMIN_REPOSITORY } from './domain/repositories/admin.repository';
import { MongooseAdminRepository } from '../repositories/mongoose-admin.repository';
import { AdminModel, AdminSchema } from '../schemas/admin.schema';
import { AdminController } from '../../../presentation/admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AdminModel.name, schema: AdminSchema }]),
  ],
  controllers: [AdminController],
  providers: [
    AdminLoginUseCase,
    MongooseAdminRepository,
    {
      provide: ADMIN_REPOSITORY,
      useExisting: MongooseAdminRepository,
    },
  ],
})
export class AdminModule {}
