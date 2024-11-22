import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { UndrawUiResolver } from 'undraw-ui/es/resolvers'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), UndrawUiResolver],

    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {

    proxy: {
      "/api": {
        target: "http://localhost:7070", // 后端服务器地址
        changeOrigin: true, // 是否改变请求域名
        rewrite: (path) => path.replace(/^\/api/, ""), //将原有请求路径中的api替换为''
      },
      '/forComment': {
        target: 'http://localhost:7070',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/forComment/, '')
      }
    },
  },
})
