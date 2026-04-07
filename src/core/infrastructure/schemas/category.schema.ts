import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<CategoryModel>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class CategoryModel {
  @Prop({ required: true, unique: true })
  name!: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
