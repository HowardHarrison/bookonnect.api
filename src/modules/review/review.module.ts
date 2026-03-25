import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeleteReviewUseCase } from './application/use-cases/delete-review.use-case';
import { GetReviewsByBookUseCase } from './application/use-cases/get-reviews-by-book.use-case';
import { GetUserReviewUseCase } from './application/use-cases/get-user-review.use-case';
import { UpsertReviewUseCase } from './application/use-cases/upsert-review.use-case';
import { REVIEW_REPOSITORY } from './domain/repositories/review.repository';
import { MongooseReviewRepository } from './infrastructure/repositories/mongoose-review.repository';
import { ReviewModel, ReviewSchema } from './infrastructure/schemas/review.schema';
import { ReviewController } from './web/controllers/review.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }]),
  ],
  controllers: [ReviewController],
  providers: [
    UpsertReviewUseCase,
    GetReviewsByBookUseCase,
    GetUserReviewUseCase,
    DeleteReviewUseCase,
    MongooseReviewRepository,
    {
      provide: REVIEW_REPOSITORY,
      useExisting: MongooseReviewRepository,
    },
  ],
})
export class ReviewModule {}
