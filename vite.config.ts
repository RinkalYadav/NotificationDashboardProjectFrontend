import { defineConfig } from 'vite';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig({
  define: {
    global: 'globalThis' // 👈 important
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
      process: 'process/browser',
      assert: 'assert'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis' // 👈 important
      }
    }
  },
  build: {
    rollupOptions: {
    //   plugins: [nodePolyfills()]
    }
  }
});
