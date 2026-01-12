import e from "express";
import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";

const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json({ success: true, data: author });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export { createAuthor, createBook };