import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Health check endpoint (100% free & key-free architecture; determination runs locally/offline on device)
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'gljivobook.app',
    version: '3.3.0',
    offlineEngine: true,
    requiresApiKey: false,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`gljivobook.app server running on http://localhost:${PORT}`);
  });
}

startServer();
