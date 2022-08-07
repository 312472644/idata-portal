import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      eslint({
        throwOnError: true,
      }),
    ],
    resolve: {
      alias: {
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@interface': path.resolve(__dirname, 'src/interface'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    define: env,
    server: {
      open: true,
    },
  };
});
