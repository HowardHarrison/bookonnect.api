import { IsMongoId } from 'class-validator';

export class ReactionStatusDto {
  @IsMongoId()
  userId!: string;

  @IsMongoId()
  bookId!: string;
}
