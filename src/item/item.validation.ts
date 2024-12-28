import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { handleValidationError } from "../helpers/errorHandling";


export const itemSchema = z.object({
  name: z.string(),
  categoryId: z.number(),
  quantity: z.number().min(0, { message: "Quantity must be greater than or equal to 0" }),
  unit: z.string(),
  purchasePrice: z.number().min(0, { message: "Purchase price must be positive" }),
  sellingPrice: z.number().optional(),
  supplierId: z.number().optional(),
});

export const validateItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    itemSchema.parse(req.body); 
    next();
  } catch (error) {
    handleValidationError(error, res);
  }
};
