import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Mock user database
const users = [
  {
    id: 1,
    email: 'admin@gmao.com',
    password: 'password', // In real app, this would be hashed
    name: 'System Administrator',
    role: 'admin'
  }
];

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
        return;
      }

      // Find user
      const user = users.find(u => u.email === email);
      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
        return;
      }

      // Check password (in real app, use bcrypt.compare)
      if (password !== user.password) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
        return;
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

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        },
        message: 'Login successful'
      });

    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(501).json({
        success: false,
        error: 'Registration not implemented yet'
      });
    } catch (error) {
      next(error);
    }
  }
}