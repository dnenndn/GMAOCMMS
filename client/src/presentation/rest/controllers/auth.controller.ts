import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../shared/exceptions/app-error';
import { ResponseBuilder } from '../../../shared/types/api-response';

// Mock user for testing
const users = [
  {
    id: 1,
    email: 'admin@gmao.com',
    password: 'password', // Simple password for testing
    name: 'System Administrator',
    role: 'admin'
  }
];

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log('Login attempt:', { email, password });

      if (!email || !password) {
        throw new AppError('Email and password are required', 400);
      }

      // Find user
      const user = users.find(u => u.email === email);
      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      // Simple password check
      if (password !== user.password) {
        throw new AppError('Invalid credentials', 401);
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          role: user.role 
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      );

      res.json(ResponseBuilder.success({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }, 'Login successful'));

    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(501).json(ResponseBuilder.error(new Error('Registration not implemented yet')));
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(ResponseBuilder.success(null, 'Logout successful'));
    } catch (error) {
      next(error);
    }
  }

  async checkAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        throw new AppError('No token provided', 401);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
      
      res.json(ResponseBuilder.success({
        user: {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role
        }
      }, 'Authentication valid'));

    } catch (error) {
      next(new AppError('Invalid token', 401));
    }
  }
}