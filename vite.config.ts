import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { createVitePlugins } from './config'


// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // const env = loadEnv(mode, process.cwd())
  return {
    plugins: createVitePlugins(command === 'serve'),
    publicDir: 'public',
    base: "./",
    // scss全局配置
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@use "@/assets/css/element/index.scss" as *;@import "@/assets/css/index.scss";@import "@/assets/css/resetElemUI.scss";'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 10086,
      open: true,
      strictPort: false,
      https: false,
      // 反向代理
      proxy: {
        '/api': {
          target: 'http://192.168.23.112:9980',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '@': resolve(__dirname, './src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    //生产模式打包配置
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // rollupOptions: {
      //   output: {
      //     // 文件分包
      //     entryFileNames: `assets/[name]${getVersion()}.js`,
      //     chunkFileNames: `assets/[name]${getVersion()}.js`,
      //     assetFileNames: `assets/[name]${getVersion()}.[ext]`,
      //   }
      // }
    },
    define: {
      // 在生产中启用/禁用intlify-devtools和vue-devtools支持，默认为false
      __INTLIFY_PROD_DEVTOOLS__: false
    }
  }
})
