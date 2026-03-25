import { IsInt, IsMongoId, IsString, Max, Min } from 'class-validator';

export class UpsertReviewDto {
  @IsMongoId()
  userId!: string;

  @IsMongoId()
  bookId!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  comment!: string;
}
