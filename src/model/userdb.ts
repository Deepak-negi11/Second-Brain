import mongoose, { Schema, model, Types } from "mongoose";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  id: Types.ObjectId

});

// Create the User model
export const User = model("User", UserSchema);
