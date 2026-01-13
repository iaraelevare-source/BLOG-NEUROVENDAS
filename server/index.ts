import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import contentRoutes from './routes/contents';
import generationRoutes from './routes/generations';
import creditRoutes from './routes/credits';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mockAI: process.env.USE_MOCK_AI !== 'false',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/generations', generationRoutes);
app.use('/api/credits', creditRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🤖 Mock AI: ${process.env.USE_MOCK_AI !== 'false' ? 'ENABLED' : 'DISABLED'}`);
    console.log(`💾 Database: ${process.env.DATABASE_URL ? 'CONFIGURED' : 'NOT CONFIGURED'}`);
  });
}

export default app;
