import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookEntity } from '../../domain/entities/book.entity';
import { BookRepository } from '../../domain/repositories/book.repository';
import { BookDocument, BookModel } from '../schemas/book.schema';

@Injectable()
export class MongooseBookRepository implements BookRepository {
  constructor(
    @InjectModel(BookModel.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}

  async findAll(): Promise<BookEntity[]> {
    const books = await this.bookModel
      .find()
      .populate('categories', 'name')
      .populate('writer', 'name')
      .lean();

    return books.map((book) => this.toEntity(book));
  }

  async findById(id: string): Promise<BookEntity | null> {
    const book = await this.bookModel
      .findById(id)
      .populate('categories', 'name')
      .populate('writer', 'name')
      .lean();

    return book ? this.toEntity(book) : null;
  }

  async findSavedByIds(ids: string[]): Promise<BookEntity[]> {
    const books = await this.bookModel
      .find({ _id: { $in: ids } })
      .populate('categories', 'name')
      .populate('writer', 'name')
      .lean();

    return books.map((book) => this.toEntity(book));
  }

  private toEntity(book: {
    _id: unknown;
    title: string;
    description?: string;
    publishDate?: Date;
    coverImage?: string;
    writer?: { _id: unknown; name: string } | null;
    categories?: Array<{ _id: unknown; name: string }>;
  }): BookEntity {
    return {
      id: String(book._id),
      title: book.title,
      description: book.description,
      publishDate: book.publishDate ?? null,
      coverImage: book.coverImage,
      writer: book.writer
        ? {
            id: String(book.writer._id),
            name: book.writer.name,
          }
        : null,
      categories: (book.categories ?? []).map((category) => ({
        id: String(category._id),
        name: category.name,
      })),
    };
  }
}
