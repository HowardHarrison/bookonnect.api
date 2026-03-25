import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BOOK_REPOSITORY, BookRepository } from '../../domain/repositories/book.repository';

@Injectable()
export class GetBookByIdUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }
}
