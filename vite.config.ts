import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, './src/lang/modules/**')
    })
  ],
  server: {
    proxy: {
      // 选项写法
      '/tc': {
        target: 'http://119.29.151.52:8080',
        changeOrigin: true
      }
    }
  }
})
