import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Ensure PWA manifest and icon files are never served stale from browser HTTP cache
app.use((req, res, next) => {
  if (
    req.path.endsWith('.webmanifest') ||
    req.path.endsWith('.ico') ||
    req.path.includes('zrina-neon') ||
    req.path.includes('pwa-') ||
    req.path.includes('apple-touch-icon') ||
    req.path.includes('favicon')
  ) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    if (req.path.endsWith('.webmanifest')) {
      res.setHeader('Content-Type', 'application/manifest+json');
    }
  }
  next();
});

// Health check endpoint — 100% free & offline-ready without any server-side API keys
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'gljivobook.app',
    version: '3.4.0',
    offlineEngine: true,
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
