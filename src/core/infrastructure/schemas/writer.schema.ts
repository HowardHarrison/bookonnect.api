import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WriterDocument = HydratedDocument<WriterModel>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class WriterModel {
  @Prop({ required: true })
  name!: string;

  @Prop()
  bio?: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  nationality?: string;

  @Prop({ default: 'profile.jpg' })
  profileImage!: string;
}

export const WriterSchema = SchemaFactory.createForClass(WriterModel);
