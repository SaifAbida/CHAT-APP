import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("Users", userSchema);

export interface userType {
  _id? :string;
  username: string;
  email: string;
  password: string;
}
