import { Inject, Injectable } from '@nestjs/common';
import { REVIEW_REPOSITORY, ReviewRepository } from '@domain/review/repositories/review.repository';

@Injectable()
export class GetReviewsByBookUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  execute(bookId: string) {
    return this.reviewRepository.findByBook(bookId);
  }
}
