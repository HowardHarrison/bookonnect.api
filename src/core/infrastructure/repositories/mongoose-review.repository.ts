import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewEntity } from '@domain/review/entities/review.entity';
import { ReviewRepository } from '@domain/review/repositories/review.repository';
import { ReviewDocument, ReviewModel } from '../schemas/review.schema';

@Injectable()
export class MongooseReviewRepository implements ReviewRepository {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async upsert(input: {
    userId: string;
    bookId: string;
    rating: number;
    comment: string;
  }): Promise<ReviewEntity> {
    const review = await this.reviewModel
      .findOneAndUpdate(
        { userId: input.userId, bookId: input.bookId },
        { rating: input.rating, comment: input.comment },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      )
      .lean();

    return this.toEntity(review);
  }

  async findByBook(bookId: string): Promise<ReviewEntity[]> {
    const reviews = await this.reviewModel
      .find({ bookId })
      .populate('userId', 'firstName profileImage')
      .sort({ createdAt: -1 })
      .lean();

    return reviews.map((review) => this.toEntity(review));
  }

  async findByUserAndBook(
    userId: string,
    bookId: string,
  ): Promise<ReviewEntity | null> {
    const review = await this.reviewModel.findOne({ userId, bookId }).lean();
    return review ? this.toEntity(review) : null;
  }

  async deleteByUserAndBook(userId: string, bookId: string): Promise<void> {
    await this.reviewModel.findOneAndDelete({ userId, bookId });
  }

  private toEntity(review: {
    _id: unknown;
    userId: unknown;
    bookId: unknown;
    rating: number;
    comment: string;
    createdAt?: Date;
  }): ReviewEntity {
    const userValue =
      typeof review.userId === 'object' && review.userId !== null && '_id' in review.userId
        ? (review.userId as { _id: unknown; firstName?: string; profileImage?: string })
        : null;

    return {
      id: String(review._id),
      userId: userValue ? String(userValue._id) : String(review.userId),
      bookId: String(review.bookId),
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: userValue
        ? {
            id: String(userValue._id),
            firstName: userValue.firstName,
            profileImage: userValue.profileImage,
          }
        : undefined,
    };
  }
}
