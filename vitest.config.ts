/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />

import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dynamicImport()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['lcov', 'clover', 'json'],
      exclude: ['src/validators/*', 'src/mocks/*', 'src/__tests__/*'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
});
