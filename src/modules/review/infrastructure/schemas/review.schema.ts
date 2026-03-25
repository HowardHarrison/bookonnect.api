import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserModel } from '../../../auth/infrastructure/schemas/user.schema';
import { BookModel } from '../../../book/infrastructure/schemas/book.schema';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class ReviewModel {
  @Prop({ type: Types.ObjectId, ref: UserModel.name, required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: BookModel.name, required: true })
  bookId!: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating!: number;

  @Prop({ required: true })
  comment!: string;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
