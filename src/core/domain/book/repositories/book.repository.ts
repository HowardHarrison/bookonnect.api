import { BookEntity } from '@domain/book/entities/book.entity';

export const BOOK_REPOSITORY = Symbol('BOOK_REPOSITORY');

export interface BookRepository {
  findAll(): Promise<BookEntity[]>;
  findById(id: string): Promise<BookEntity | null>;
  findSavedByIds(ids: string[]): Promise<BookEntity[]>;
}
