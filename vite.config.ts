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
    define: JSON.stringify(env) as any,
    server: {
      open: true,
      proxy: {
        '/userinfo': {
          target: 'http://120.79.230.22:20112/diBus',
          changeOrigin: true,
        },
        '/datasource': {
          target: 'http://120.79.230.22:20112/diBus',
          changeOrigin: true,
        },
        '/sysconfig': {
          target: 'http://120.79.230.22:20112/diBus',
          changeOrigin: true,
        },
        '/task': {
          target: 'http://120.79.230.22:20112/diBus',
          changeOrigin: true,
        },
        '/rule': {
          target: 'http://120.79.230.22:20112/diBus',
          changeOrigin: true,
        },
        '/license': {
          target: 'http://120.79.230.22:20112/diBus',
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
        '@service': path.resolve(__dirname, 'src/service'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // eslint-disable-next-line quotes
          additionalData: `
          @use './src/styles/element/index.scss' as *;
          @use './src/styles/element/var.scss' as *;`,
        },
      },
    },
  };
});
