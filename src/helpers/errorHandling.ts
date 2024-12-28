import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * General error handler for validation errors and unexpected errors.
 * @param error - The error object thrown.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next middleware function.
 */
export const handleValidationError = (error: unknown, res: Response): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.errors,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Handle generic server errors and respond with a consistent error message.
 * @param error - The error object thrown.
 * @param res - The Express response object.
 * @param message - Custom error message.
 */
export const handleServerError = (error: unknown, res: Response, message: string): void => {
  console.error(error);
  res.status(500).json({
    success: false,
    message,
  });
};