import { mongoose } from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
});

export const Author = mongoose.model('Author', authorSchema);