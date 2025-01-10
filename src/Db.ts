import mongoose, { Schema, Document, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config()


const Mongo_Url=process.env.mongo_URI
// Connect to MongoDB
mongoose
  .connect(Mongo_Url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the database connection fails
  });

// Define the User schema and interface


const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

// Create the User model
export const UserModel = model("User", UserSchema);
