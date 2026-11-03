import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.ico',
          'favicon.png',
          'apple-touch-icon.png',
          'logo.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
          'zrina-neon-favicon.ico',
          'zrina-neon-favicon-64.png',
          'zrina-neon-apple-180.png',
          'zrina-neon-192.png',
          'zrina-neon-512.png',
          'zrina-neon-maskable-512.png',
        ],
        manifest: {
          id: 'gljivobook-app-by-zrina-v34',
          name: 'gljivobook.app',
          short_name: 'gljivobook.app',
          description: 'Terenski mikološki priručnik, vizualni ključ i offline GPS dnevnik nalaza by Zrina.',
          theme_color: '#040d09',
          background_color: '#040d09',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/zrina-neon-192.png?v=34',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/zrina-neon-512.png?v=34',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/zrina-neon-maskable-512.png?v=34',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
          globIgnores: ['**/assets/aistudio/**'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/upload\.wikimedia\.org\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'wikimedia-images',
                expiration: {
                  maxEntries: 350,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/inaturalist-open-data\.s3\.amazonaws\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'inaturalist-s3-images',
                expiration: {
                  maxEntries: 400,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/static\.inaturalist\.org\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'inaturalist-static-images',
                expiration: {
                  maxEntries: 400,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/api\.inaturalist\.org\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'inaturalist-api-cache',
                expiration: {
                  maxEntries: 350,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/en\.wikipedia\.org\/api\/rest_v1\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'wikipedia-rest-cache',
                expiration: {
                  maxEntries: 350,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/api\.open-meteo\.com\/v1\/forecast.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'open-meteo-forecast-cache',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 3, // 3 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/server\.arcgisonline\.com\/ArcGIS\/rest\/services\/World_Imagery\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'esri-satellite-tiles-cache',
                expiration: {
                  maxEntries: 500,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/[a-c]\.tile\.opentopomap\.org\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'opentopomap-tiles-cache',
                expiration: {
                  maxEntries: 500,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: false,
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

