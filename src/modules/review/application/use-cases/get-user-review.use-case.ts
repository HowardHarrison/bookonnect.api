import { Inject, Injectable } from '@nestjs/common';
import { REVIEW_REPOSITORY, ReviewRepository } from '../../domain/repositories/review.repository';

@Injectable()
export class GetUserReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  execute(input: { userId: string; bookId: string }) {
    return this.reviewRepository.findByUserAndBook(input.userId, input.bookId);
  }
}
