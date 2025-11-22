import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import lookupRouter from './routes/lookup.js';
import chatRouter from './routes/chat.js';
import storyRouter from './routes/story.js';
import imageRouter from './routes/image.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/lookup', lookupRouter);
app.use('/api/chat', chatRouter);
app.use('/api/generate-story', storyRouter);
app.use('/api/generate-image', imageRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Dictionary API is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Dictionary API running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
