import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { command } = config

  return {
    base: '/',
    resolve: {
      // 设置别名
      alias: {
        '@': pathSrc,
      },
    },
    plugins: [
      Vue(),
      vueJsx(),
      viteMockServe({
        // 只在开发阶段开启 mock 服务
        localEnabled: command === 'serve',
      }),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),

      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],

        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),

      Icons({
        autoInstall: true,
      }),
    ],
    server: {
      host: true,
      port: 8080, // 启动端口
      hmr: true,
      // hmr: {
      //   host: '127.0.0.1',
      //   port: 8080,
      // },
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
