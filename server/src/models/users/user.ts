import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  email: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  email: String,
  isAdmin: Boolean,
});

export const User = mongoose.model<UserDocument>('User', userSchema);
