import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { handleValidationError } from '../helpers/errorHandling';

export const auditSchema = z.object({
  itemId: z.number().int(),
  userId: z.number().int(),
  expectedQuantity: z.number().int().min(0, { message: "Expected quantity must be greater than or equal to 0" }),
  actualQuantity: z.number().int().min(0, { message: "Actual quantity must be greater than or equal to 0" }),
  difference: z.number().int(),
  auditDate: z.string().transform((val) => new Date(val)), 
  notes: z.string().optional(),
});

export const validateAudit = (req: Request, res: Response, next: NextFunction) => {
  try {
    auditSchema.parse(req.body);
    next();
  } catch (error) {
    handleValidationError(error, res);
  }
};
