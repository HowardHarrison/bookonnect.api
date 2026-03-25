import { IsMongoId } from 'class-validator';

export class ToggleSavedBookDto {
  @IsMongoId()
  bookId!: string;
}
