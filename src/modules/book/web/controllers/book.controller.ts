import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetBookByIdUseCase } from '../../application/use-cases/get-book-by-id.use-case';
import { GetBooksUseCase } from '../../application/use-cases/get-books.use-case';
import { GetSavedBooksUseCase } from '../../application/use-cases/get-saved-books.use-case';

@Controller('books')
export class BookController {
  constructor(
    private readonly getBooksUseCase: GetBooksUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getSavedBooksUseCase: GetSavedBooksUseCase,
  ) {}

  @Get()
  getBooks() {
    return this.getBooksUseCase.execute();
  }

  @Get('saved-books')
  getSavedBooks(@Query('ids') ids?: string) {
    return this.getSavedBooksUseCase.execute(ids);
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.getBookByIdUseCase.execute(id);
  }
}
