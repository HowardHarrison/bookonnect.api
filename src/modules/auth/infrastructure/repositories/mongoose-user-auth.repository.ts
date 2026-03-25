import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthEntity } from '../../domain/entities/user-auth.entity';
import { UserAuthRepository } from '../../domain/repositories/user-auth.repository';
import { UserDocument, UserModel } from '../schemas/user.schema';

@Injectable()
export class MongooseUserAuthRepository implements UserAuthRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserAuthEntity | null> {
    const user = await this.userModel.findOne({ email }).lean();
    return user ? this.toEntity(user) : null;
  }

  async create(input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
  }): Promise<UserAuthEntity> {
    const created = await this.userModel.create({
      ...input,
      savedBooks: [],
    });

    return this.toEntity(created.toObject());
  }

  private toEntity(user: {
    _id: unknown;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
    savedBooks?: Array<{ toString(): string }>;
  }): UserAuthEntity {
    return new UserAuthEntity(
      String(user._id),
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.profileImage,
      (user.savedBooks ?? []).map((bookId) => bookId.toString()),
    );
  }
}
