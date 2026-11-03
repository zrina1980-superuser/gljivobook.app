import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Purge any legacy Service Worker precache from older builds so the new neon PWA icons
// and manifest are always fetched fresh when installing the app on Desktop or Mobile.
const ICON_CACHE_VERSION = 'gljivobook_icon_cache_v34';
if (typeof window !== 'undefined') {
  try {
    if (localStorage.getItem(ICON_CACHE_VERSION) !== 'true') {
      localStorage.setItem(ICON_CACHE_VERSION, 'true');
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => {
            if (key.includes('workbox-precache')) {
              caches.delete(key);
            }
          });
        });
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) => {
          regs.forEach((reg) => {
            reg.update();
          });
        });
      }
    }
  } catch {
    // Ignore storage/cache access errors
  }
}

createRoot(document.getElementById('root')!).render(<App />);
