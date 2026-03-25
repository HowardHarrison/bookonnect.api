import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class UserModel {
  @Prop({ required: true, minlength: 2, maxlength: 50 })
  firstName!: string;

  @Prop({ required: true, minlength: 2, maxlength: 50 })
  lastName!: string;

  @Prop({ required: true, unique: true, maxlength: 50 })
  email!: string;

  @Prop({ required: true, minlength: 5 })
  password!: string;

  @Prop()
  profileImage!: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'BookModel' }],
    default: [],
  })
  savedBooks!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
