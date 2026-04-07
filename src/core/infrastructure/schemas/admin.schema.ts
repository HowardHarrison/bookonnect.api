import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<AdminModel>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class AdminModel {
  @Prop({ required: true, minlength: 2, maxlength: 50 })
  firstName!: string;

  @Prop({ required: true, minlength: 2, maxlength: 50 })
  lastName!: string;

  @Prop({ required: true, unique: true, maxlength: 100 })
  email!: string;

  @Prop({ required: true, minlength: 5 })
  password!: string;

  @Prop({
    enum: ['superadmin', 'moderator', 'editor'],
    default: 'editor',
  })
  role!: string;

  @Prop({
    type: {
      manageUsers: { type: Boolean, default: false },
      manageCategories: { type: Boolean, default: true },
      manageBooks: { type: Boolean, default: true },
      manageReviews: { type: Boolean, default: false },
    },
    default: {
      manageUsers: false,
      manageCategories: true,
      manageBooks: true,
      manageReviews: false,
    },
  })
  permissions!: Record<string, boolean>;

  @Prop({ default: true })
  isActive!: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(AdminModel);
