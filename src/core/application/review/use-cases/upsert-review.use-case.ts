import { Inject, Injectable } from '@nestjs/common';
import { REVIEW_REPOSITORY, ReviewRepository } from '@domain/review/repositories/review.repository';

@Injectable()
export class UpsertReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  execute(input: {
    userId: string;
    bookId: string;
    rating: number;
    comment: string;
  }) {
    return this.reviewRepository.upsert(input);
  }
}
