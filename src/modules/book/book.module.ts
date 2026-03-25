import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetBookByIdUseCase } from './application/use-cases/get-book-by-id.use-case';
import { GetBooksUseCase } from './application/use-cases/get-books.use-case';
import { GetSavedBooksUseCase } from './application/use-cases/get-saved-books.use-case';
import { BOOK_REPOSITORY } from './domain/repositories/book.repository';
import { MongooseBookRepository } from './infrastructure/repositories/mongoose-book.repository';
import { BookModel, BookSchema } from './infrastructure/schemas/book.schema';
import { CategoryModel, CategorySchema } from './infrastructure/schemas/category.schema';
import { WriterModel, WriterSchema } from './infrastructure/schemas/writer.schema';
import { BookController } from './web/controllers/book.controller';

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
