import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeleteReviewUseCase } from '@application/review/use-cases/delete-review.use-case';
import { GetReviewsByBookUseCase } from '@application/review/use-cases/get-reviews-by-book.use-case';
import { GetUserReviewUseCase } from '@application/review/use-cases/get-user-review.use-case';
import { UpsertReviewUseCase } from '@application/review/use-cases/upsert-review.use-case';
import { REVIEW_REPOSITORY } from '@domain/review/repositories/review.repository';
import { ReviewController } from '@presentation/review.controller';
import { MongooseReviewRepository } from '../repositories/mongoose-review.repository';
import { ReviewModel, ReviewSchema } from '../schemas/review.schema';

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
