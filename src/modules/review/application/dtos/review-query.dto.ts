import { IsMongoId } from 'class-validator';

export class ReviewQueryDto {
  @IsMongoId()
  userId!: string;

  @IsMongoId()
  bookId!: string;
}
