import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewQueryDto } from '../core/application/review/dtos/review-query.dto';
import { UpsertReviewDto } from '../core/application/review/dtos/upsert-review.dto';
import { DeleteReviewUseCase } from '../core/application/review/use-cases/delete-review.use-case';
import { GetReviewsByBookUseCase } from '../core/application/review/use-cases/get-reviews-by-book.use-case';
import { GetUserReviewUseCase } from '../core/application/review/use-cases/get-user-review.use-case';
import { UpsertReviewUseCase } from '../core/application/review/use-cases/upsert-review.use-case';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly upsertReviewUseCase: UpsertReviewUseCase,
    private readonly getReviewsByBookUseCase: GetReviewsByBookUseCase,
    private readonly getUserReviewUseCase: GetUserReviewUseCase,
    private readonly deleteReviewUseCase: DeleteReviewUseCase,
  ) {}

  @Post()
  upsert(@Body() dto: UpsertReviewDto) {
    return this.upsertReviewUseCase.execute(dto);
  }

  @Get('book/:bookId')
  getByBook(@Param('bookId') bookId: string) {
    return this.getReviewsByBookUseCase.execute(bookId);
  }

  @Get('user')
  getUserReview(@Query() dto: ReviewQueryDto) {
    return this.getUserReviewUseCase.execute(dto);
  }

  @Delete()
  deleteReview(@Query() dto: ReviewQueryDto) {
    return this.deleteReviewUseCase.execute(dto);
  }
}
