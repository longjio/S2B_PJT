import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: './',
  publicDir: '../public',

  server: {
    port: 3000,
    open: true,
    host: true
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        // 추가 페이지가 있다면 여기에 추가
        // about: resolve(__dirname, 'src/about.html'),
      }
    }
  },

  plugins: [
    // HTML plugin removed - not needed since partials aren't being used
  ],

  css: {
    preprocessorOptions: {
      scss: {
        // main.scss에서 이미 임포트하므로 additionalData 불필요
        silenceDeprecations: ['legacy-js-api']
      }
    }
  }
});
