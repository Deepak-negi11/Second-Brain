import mongoose, { Schema, model, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  id:Types.ObjectId
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  id: Types.ObjectId,
  role:{type:String ,default:'user'}

});

// Create the User model
export const User = model<IUser>("User", UserSchema);
