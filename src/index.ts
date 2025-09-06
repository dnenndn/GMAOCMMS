import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { equipmentRoutes } from './presentation/rest/routes/equipment.routes';
import { errorHandler } from './shared/middleware/error-handler';

dotenv.config();

async function bootstrap() {
  try {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(helmet());
    app.use(compression());
    app.use(cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    app.use('/uploads', express.static('uploads'));

    // Routes
    app.use('/api/equipment', equipmentRoutes);

    app.get('/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date() });
    });

    // Simple test route
    app.get('/api/test', (req, res) => {
      res.json({ message: 'API is working!' });
    });

    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`❤️  Health check: http://localhost:${port}/health`);
      console.log(`🧪 Test endpoint: http://localhost:${port}/api/test`);
    });

  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap().catch(console.error);