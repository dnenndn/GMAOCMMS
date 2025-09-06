import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../exceptions/app-error';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new AppError('Access denied. No token provided.', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    (req as any).user = decoded;
    next();
  } catch (error) {
    next(new AppError('Invalid token.', 401));
  }
};
