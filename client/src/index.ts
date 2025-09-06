import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { authRoutes } from './presentation/rest/routes/auth.routes';
import { equipmentRoutes } from './presentation/rest/routes/equipment.routes';
import { errorHandler } from './shared/middleware/error-handler';

dotenv.config();

async function bootstrap() {
  try {
    const app = express();
    const server = createServer(app);
    const port = process.env.PORT || 3000;

    // ================= CORS CONFIGURATION =================
    const corsOptions = {
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      optionsSuccessStatus: 200
    };

    // Security middleware
    app.use(helmet());
    app.use(compression());
    
    // CORS Middleware (MUST be after security, before other middleware)
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));

    // CORS headers middleware
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
      
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      
      next();
    });

    // ================= ESSENTIAL MIDDLEWARE =================
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Static files
    app.use('/uploads', express.static('uploads'));

    // ================= ROUTES =================
    app.use('/api/auth', authRoutes);
    app.use('/api/equipment', equipmentRoutes);

    // Health check
    app.get('/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date() });
    });

    // Test endpoint
    app.get('/api/test', (req, res) => {
      res.json({ message: 'API is working!' });
    });

    // ================= DEBUG (TEMPORARY) =================
    // Remove this after testing
    app.use('/api/debug/routes', (req, res) => {
      const routes = app._router.stack
        .filter((layer: any) => layer.route)
        .map((layer: any) => ({
          path: layer.route.path,
          methods: Object.keys(layer.route.methods)
        }));
      
      res.json({ routes });
    });

    console.log('Registered routes:');
    app._router.stack.forEach((layer: any) => {
      if (layer.route) {
        console.log(`${Object.keys(layer.route.methods).join(', ').toUpperCase()} ${layer.route.path}`);
      }
    });

    // ================= ERROR HANDLING =================
    app.use(errorHandler);
// Simple test route (add this before other routes)
app.post('/api/test-login', (req, res) => {
  res.json({
    success: true,
    data: {
      token: 'test-token',
      user: { id: 1, email: 'test@test.com', name: 'Test User' }
    }
  });
});
    // ================= START SERVER =================
    server.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`❤️  Health check: http://localhost:${port}/health`);
      console.log(`🧪 Test endpoint: http://localhost:${port}/api/test`);
      console.log(`🔧 Debug routes: http://localhost:${port}/api/debug/routes`);
    });

  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap().catch(console.error);