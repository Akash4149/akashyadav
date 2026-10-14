import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { router as apiRouter } from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Serve static assets in production if built
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

// Start Server
app.listen(PORT, async () => {
  console.log('\n======================================================');
  console.log(`⚡ [TESLA POWERTRAIN] Server active on http://localhost:${PORT}`);
  console.log('⚡ [SYSTEM] Mode: MERN Fullstack Portfolio Architecture');
  console.log('======================================================\n');
  await connectDB();
});
