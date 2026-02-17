import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error for debugging
  console.error("Error:", err);

  // Handle custom errors
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
    return;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation error",
      errors: err.message,
    });
    return;
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid ID format",
    });
    return;
  }

  // Handle duplicate key errors (MongoDB)
  if ((err as any).code === 11000) {
    res.status(StatusCodes.CONFLICT).json({
      success: false,
      message: "Duplicate field value entered",
    });
    return;
  }

  // Default error response
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
