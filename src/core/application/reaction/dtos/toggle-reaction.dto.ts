import { IsMongoId } from 'class-validator';

export class ToggleReactionDto {
  @IsMongoId()
  userId!: string;

  @IsMongoId()
  bookId!: string;
}
