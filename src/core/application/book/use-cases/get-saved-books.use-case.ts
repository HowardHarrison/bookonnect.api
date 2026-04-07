import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { BOOK_REPOSITORY, BookRepository } from '@domain/book/repositories/book.repository';

@Injectable()
export class GetSavedBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(ids?: string) {
    if (!ids) {
      return [];
    }

    const validIds = ids
      .split(',')
      .map((value) => value.trim())
      .filter((value) => Types.ObjectId.isValid(value));

    if (validIds.length === 0) {
      return [];
    }

    return this.bookRepository.findSavedByIds(validIds);
  }
}
