import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserModel } from '../../../auth/infrastructure/schemas/user.schema';
import { BookModel } from '../../../../core/infrastructure/schemas/book.schema';

export type ReactionDocument = HydratedDocument<ReactionModel>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class ReactionModel {
  @Prop({ type: Types.ObjectId, ref: UserModel.name, required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: BookModel.name, required: true })
  bookId!: Types.ObjectId;
}

export const ReactionSchema = SchemaFactory.createForClass(ReactionModel);
ReactionSchema.index({ userId: 1, bookId: 1 }, { unique: true });
