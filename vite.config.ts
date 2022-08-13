import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
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
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
    ],
    define: env,
    server: {
      open: true,
      proxy: {
        '/services': {
          target: 'https://api-v2.scoregg.com/',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@interface': path.resolve(__dirname, 'src/interface'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // eslint-disable-next-line quotes
          additionalData: `
          @use './src/styles/element/var.scss' as *;`,
        },
      },
    },
  };
});
