import mongoose, { Schema, Document, model } from "mongoose";

// MongoDB connection URI
const mongoURI = "mongodb+srv://deepaknegi108r:JHnixgAFz445IawB@cluster0.dbdt7.mongodb.net/userjjkk";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the database connection fails
  });

// Define the User schema and interface
interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

// Create the User model
export const UserModel = model<IUser>("User", UserSchema);
