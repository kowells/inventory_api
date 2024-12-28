import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { handleValidationError } from "../helpers/errorHandling";

export const locationSchema = z.object({
  name: z.string().min(3).max(50), // Nama lokasi harus minimal 3 karakter, maksimal 50
  address: z.string().optional(), 
});

export const validateLocation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    locationSchema.parse(req.body); 
    next(); 
  } catch (error) {
    handleValidationError(error, res)
  }
};
