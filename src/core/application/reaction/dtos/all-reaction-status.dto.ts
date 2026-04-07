import { IsMongoId } from 'class-validator';

export class AllReactionStatusDto {
  @IsMongoId()
  bookId!: string;
}
