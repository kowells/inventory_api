import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { handleValidationError } from "../helpers/errorHandling";

export const categorySchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().optional(),
});

export const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    categorySchema.parse(req.body);
    next();
  } catch (error) {
    handleValidationError(error, res);
  }
};
