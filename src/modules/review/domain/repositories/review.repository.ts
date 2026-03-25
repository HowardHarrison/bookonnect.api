import { ReviewEntity } from '../entities/review.entity';

export const REVIEW_REPOSITORY = Symbol('REVIEW_REPOSITORY');

export interface ReviewRepository {
  upsert(input: {
    userId: string;
    bookId: string;
    rating: number;
    comment: string;
  }): Promise<ReviewEntity>;
  findByBook(bookId: string): Promise<ReviewEntity[]>;
  findByUserAndBook(userId: string, bookId: string): Promise<ReviewEntity | null>;
  deleteByUserAndBook(userId: string, bookId: string): Promise<void>;
}
