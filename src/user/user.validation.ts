import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { handleValidationError } from '../helpers/errorHandling';


export const userSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "AUDITOR"]),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const validateUserRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    handleValidationError(error, res)
  }
};

export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    handleValidationError(error, res)
  }
};

