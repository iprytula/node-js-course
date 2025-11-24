import mongoose, { Document } from "mongoose";

// Interface for User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

interface IUserModel extends mongoose.Model<IUser> { }

const UserSchema = new mongoose.Schema<IUser, IUserModel>({
  username: {
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
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Email is invalid",
    },
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

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
