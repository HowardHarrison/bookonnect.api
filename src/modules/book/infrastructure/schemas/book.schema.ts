import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CategoryModel } from './category.schema';
import { WriterModel } from './writer.schema';

export type BookDocument = HydratedDocument<BookModel>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class BookModel {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop()
  publishDate?: Date;

  @Prop()
  coverImage?: string;

  @Prop({ type: Types.ObjectId, ref: WriterModel.name })
  writer?: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: CategoryModel.name }],
    default: [],
  })
  categories!: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(BookModel);
