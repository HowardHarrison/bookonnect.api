import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserDocument,
  UserModel,
} from '../../../auth/infrastructure/schemas/user.schema';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id).lean();
    return user ? this.toEntity(user) : null;
  }

  async toggleSavedBook(
    userId: string,
    bookId: string,
  ): Promise<{ savedBooks: string[]; exists: boolean }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const exists = user.savedBooks.some((id) => id.toString() === bookId);
    if (exists) {
      user.savedBooks = user.savedBooks.filter((id) => id.toString() !== bookId);
    } else {
      user.savedBooks.push(new Types.ObjectId(bookId));
    }

    await user.save();

    return {
      exists,
      savedBooks: user.savedBooks.map((id) => id.toString()),
    };
  }

  async updateUser(
    userId: string,
    input: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      profileImage?: string;
    },
  ): Promise<void> {
    const updatePayload = Object.fromEntries(
      Object.entries(input).filter(([, value]) => value !== undefined),
    );

    const result = await this.userModel.findByIdAndUpdate(userId, updatePayload);
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  private toEntity(user: {
    _id: unknown;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
    savedBooks?: Array<{ toString(): string }>;
  }): UserEntity {
    return {
      id: String(user._id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage: user.profileImage,
      savedBooks: (user.savedBooks ?? []).map((bookId) => bookId.toString()),
    };
  }
}
