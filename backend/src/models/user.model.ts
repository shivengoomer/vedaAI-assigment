import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
