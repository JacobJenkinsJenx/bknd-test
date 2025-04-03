// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'

import tailwindcss from '@tailwindcss/vite';
import solidJs from '@astrojs/solid-js';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      rollupOptions: {
        external: ['@libsql/client', '@libsql/win32-x64-msvc'],
        
      }
    }
  },

  integrations: [
    solidJs({
      include: ['./src/**']
    }),
    react({
      include: ["**/src/react/**", "**/node_modules/@bknd/**", "**/node_modules/bknd/**"]
    }),
  ]
});