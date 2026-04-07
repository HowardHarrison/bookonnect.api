import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetBookByIdUseCase } from '@application/book/use-cases/get-book-by-id.use-case';
import { GetBooksUseCase } from '@application/book/use-cases/get-books.use-case';
import { GetSavedBooksUseCase } from '@application/book/use-cases/get-saved-books.use-case';
import { BOOK_REPOSITORY } from '@domain/book/repositories/book.repository';
import { BookController } from '@presentation/book.controller';
import { MongooseBookRepository } from '../repositories/mongoose-book.repository';
import { BookModel, BookSchema } from '../schemas/book.schema';
import { CategoryModel, CategorySchema } from '../schemas/category.schema';
import { WriterModel, WriterSchema } from '../schemas/writer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookModel.name, schema: BookSchema },
      { name: CategoryModel.name, schema: CategorySchema },
      { name: WriterModel.name, schema: WriterSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [
    GetBooksUseCase,
    GetBookByIdUseCase,
    GetSavedBooksUseCase,
    MongooseBookRepository,
    {
      provide: BOOK_REPOSITORY,
      useExisting: MongooseBookRepository,
    },
  ],
})
export class BookModule {}
