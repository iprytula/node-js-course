import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    message: "Name is required",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    message: "Email is required",
  },
  password: {
    type: String,
    required: true,
    message: "Password is required",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;
