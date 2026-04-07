import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminEntity } from '../../domain/admin/entities/admin.entity';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { AdminDocument, AdminModel } from '../schemas/admin.schema';

@Injectable()
export class MongooseAdminRepository implements AdminRepository {
  constructor(
    @InjectModel(AdminModel.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async findByEmail(email: string): Promise<AdminEntity | null> {
    const admin = await this.adminModel.findOne({ email }).lean();
    if (!admin) {
      return null;
    }

    return new AdminEntity(
      String(admin._id),
      admin.firstName,
      admin.lastName,
      admin.email,
      admin.password,
      admin.role,
      admin.permissions,
      admin.isActive,
    );
  }
}
