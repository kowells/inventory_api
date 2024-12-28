import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { handleValidationError } from "../helpers/errorHandling";

export const inventoryLogSchema = z.object({
  itemId: z.number().int(),
  userId: z.number().int(),
  changeQuantity: z.number().int().min(1),
  beforeQuantity: z.number().int().min(0),
  afterQuantity: z.number().int().min(0),
  logDate: z.string().optional(),
});

export const validateInventoryLog = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    inventoryLogSchema.parse(req.body);
    next(); 
  } catch (error) {
    handleValidationError(error, res);
  }
};
