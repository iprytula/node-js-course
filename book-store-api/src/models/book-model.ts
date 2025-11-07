import mongoose, { Schema } from "mongoose";
import { BookInterface } from "../types/book.interface";

const BookSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [100, "Title must be at most 100 characters"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    maxLength: [100, "Author must be at most 100 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be at least 0"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxLength: [1000, "Description must be at most 1000 characters"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<BookInterface>("Book", BookSchema);
