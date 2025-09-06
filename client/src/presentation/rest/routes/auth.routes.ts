import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/login', (req, res, next) => {
  authController.login(req, res, next);
});

router.post('/register', (req, res, next) => {
  authController.register(req, res, next);
});

router.post('/logout', (req, res, next) => {
  authController.logout(req, res, next);
});

router.get('/check-auth', (req, res, next) => {
  authController.checkAuth(req, res, next);
});
// Simple test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

export const authRoutes = router;