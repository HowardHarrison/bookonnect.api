import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReactionEntity } from '../../domain/entities/reaction.entity';
import { ReactionRepository } from '../../domain/repositories/reaction.repository';
import { ReactionDocument, ReactionModel } from '../schemas/reaction.schema';

@Injectable()
export class MongooseReactionRepository implements ReactionRepository {
  constructor(
    @InjectModel(ReactionModel.name)
    private readonly reactionModel: Model<ReactionDocument>,
  ) {}

  async findByUserAndBook(
    userId: string,
    bookId: string,
  ): Promise<ReactionEntity | null> {
    const reaction = await this.reactionModel.findOne({ userId, bookId }).lean();
    return reaction
      ? {
          id: String(reaction._id),
          userId: String(reaction.userId),
          bookId: String(reaction.bookId),
        }
      : null;
  }

  async create(userId: string, bookId: string): Promise<void> {
    await this.reactionModel.create({ userId, bookId });
  }

  async deleteByUserAndBook(userId: string, bookId: string): Promise<void> {
    await this.reactionModel.findOneAndDelete({ userId, bookId });
  }

  async countByBook(bookId: string): Promise<number> {
    return this.reactionModel.countDocuments({ bookId });
  }
}
