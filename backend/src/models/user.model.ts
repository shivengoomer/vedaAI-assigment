import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role?: string;
  schoolName?: string;
  schoolBranch?: string;
  schoolCode?: string;
  aiModel?: string;
  aiStrictNCERT?: boolean;
  aiCreativity?: number;
  plan?: string;
  planStatus?: string;
  creditsUsed?: number;
  creditsLimit?: number;
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
    role: { type: String, default: 'Senior Science Teacher' },
    schoolName: { type: String, default: 'Delhi Public School' },
    schoolBranch: { type: String, default: 'Bokaro Steel City, Sector-4' },
    schoolCode: { type: String, default: 'CBSE-3430015' },
    aiModel: { type: String, default: 'gemini-1.5-flash' },
    aiStrictNCERT: { type: Boolean, default: true },
    aiCreativity: { type: Number, default: 0.2 },
    plan: { type: String, default: 'Free Trial' },
    planStatus: { type: String, default: 'active' },
    creditsUsed: { type: Number, default: 0 },
    creditsLimit: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
