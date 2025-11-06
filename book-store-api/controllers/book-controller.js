const Book = require("../models/book-model");
const { StatusCodes } = require("http-status-codes");

const controller = {
  getBooks: async (req, res) => {
    const books = await Book.find();
    if (!books) {
      res.status(StatusCodes.NOT_FOUND).send({
        message: "Books not found",
      });
    }
    res.status(StatusCodes.OK).send({
      message: "Books found successfully",
      books,
    });
  },
  getBookById: async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(StatusCodes.NOT_FOUND).send({
        message: "Book not found",
      });
    } else {
      res.status(StatusCodes.OK).send({
        message: "Book found successfully",
        book,
      });
    }
  },
  createBook: async (req, res) => {
    const createdBook = await Book.create(req.body);
    if (!createdBook) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "Book not created",
      });
    } else {
      res.status(StatusCodes.CREATED).send({
        message: "Book created successfully",
        book: createdBook,
      });
    }
  },
  updateBook: async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "Book not updated",
      });
    } else {
      res.status(StatusCodes.OK).send({
        message: "Book updated successfully",
        book: updatedBook,
      });
    }
  },
  deleteBook: async (req, res) => {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "Book not deleted",
      });
    } else {
      res.status(StatusCodes.OK).send({
        message: "Book deleted successfully",
        book: deletedBook,
      });
    }
  },
};

module.exports = controller;
