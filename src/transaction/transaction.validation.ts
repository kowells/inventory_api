import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { handleValidationError } from '../helpers/errorHandling';

export const transactionSchema = z.object({
  itemId: z.number().int(),  
  userId: z.number().int(),
  transactionType: z.enum(['IN', 'OUT']), 
  quantity: z.number().int().min(1),
  notes: z.string().optional(),
  transactionDate: z.string().optional(), 
});

export const validateTransaction = (req: Request, res: Response, next: NextFunction) => {
  try {
    transactionSchema.parse(req.body);
    next();
  } catch (error) {
    handleValidationError(error, res)
  }
};
