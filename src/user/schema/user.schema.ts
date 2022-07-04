import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  userEmail: string;

  @Prop({ type: String, required: true })
  userPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
