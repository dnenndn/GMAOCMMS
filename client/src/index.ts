import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Basic middleware ONLY
app.use(express.json());

// Test endpoint - this works
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Health endpoint - this should work
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Login endpoint - SIMPLIFIED
app.post('/login', (req, res) => {
  console.log('Login attempt received');
  res.json({ 
    success: true, 
    message: 'Login successful',
    user: { email: req.body.email, id: 1 }
  });
});

// Debug endpoint - SIMPLIFIED
app.get('/debug', (req, res) => {
  res.json({ message: 'Debug endpoint working' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🧪 Test: http://localhost:${port}/api/test`);
  console.log(`❤️  Health: http://localhost:${port}/health`);
  console.log(`🔐 Login: http://localhost:${port}/login`);
  console.log(`🐛 Debug: http://localhost:${port}/debug`);
});