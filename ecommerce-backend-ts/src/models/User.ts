import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  firstName: string; // Add this line
  lastName: string;  // Add this line
  email: string;
  password?: string;
  matchPassword(enteredPass: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true }, // Add this line
  lastName: { type: String, required: true },  // Add this line
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  // Add the '!' to assure TypeScript that password is not undefined here
  this.password = await bcrypt.hash(this.password!, salt); 
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPass: string) {
  // Add the '!' here as well for the same reason
  return await bcrypt.compare(enteredPass, this.password!); 
};

export const User = model<IUser>('User', userSchema);