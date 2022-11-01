import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { command } = config

  return {
    resolve: {
      // 设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      viteMockServe({
      // 只在开发阶段开启 mock 服务
        localEnabled: command === 'serve',
      }),
    ],
    server: {
      host: true,
      port: 8080, // 启动端口
      hmr: {
        host: '127.0.0.1',
        port: 8080,
      },
      // 设置 https 代理
      proxy: {
        // '/api': {
        //   target: 'your https address',
        //   changeOrigin: true,
        //   rewrite: (path: string) => path.replace(/^\/api/, '')
        // }
      },
    },
  }
})
