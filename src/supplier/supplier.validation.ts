import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { handleValidationError } from "../helpers/errorHandling";

export const supplierSchema = z.object({
  name: z.string().min(3).max(100),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const validateSupplier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    supplierSchema.parse(req.body);
    next();
  } catch (error) {
    handleValidationError(error, res)
  }
};
