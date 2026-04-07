import { Inject, Injectable } from '@nestjs/common';
import { REVIEW_REPOSITORY, ReviewRepository } from '@domain/review/repositories/review.repository';

@Injectable()
export class DeleteReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async execute(input: { userId: string; bookId: string }) {
    await this.reviewRepository.deleteByUserAndBook(input.userId, input.bookId);
    return { message: 'Review deleted' };
  }
}
