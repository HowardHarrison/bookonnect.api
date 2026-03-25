import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewQueryDto } from '../../application/dtos/review-query.dto';
import { UpsertReviewDto } from '../../application/dtos/upsert-review.dto';
import { DeleteReviewUseCase } from '../../application/use-cases/delete-review.use-case';
import { GetReviewsByBookUseCase } from '../../application/use-cases/get-reviews-by-book.use-case';
import { GetUserReviewUseCase } from '../../application/use-cases/get-user-review.use-case';
import { UpsertReviewUseCase } from '../../application/use-cases/upsert-review.use-case';

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
