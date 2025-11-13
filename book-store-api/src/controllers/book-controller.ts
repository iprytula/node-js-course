import { Request, Response, NextFunction } from "express";
import Book from "../models/book-model";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/custom-error";
import { asyncHandler } from "../middleware/async-handler";

export const getBooks = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const books = await Book.find();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Books found successfully",
    count: books.length,
    books,
  });
});

export const getBookById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new NotFoundError("Book not found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Book found successfully",
    book,
  });
});

export const createBook = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const createdBook = await Book.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Book created successfully",
    book: createdBook,
  });
});

export const updateBook = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBook) {
    throw new NotFoundError("Book not found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Book updated successfully",
    book: updatedBook,
  });
});

export const deleteBook = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);

  if (!deletedBook) {
    throw new NotFoundError("Book not found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Book deleted successfully",
    book: deletedBook,
  });
});