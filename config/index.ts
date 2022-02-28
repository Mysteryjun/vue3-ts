import vue from '@vitejs/plugin-vue'
// Element-plus  完整引入  打包时会提示charset的警告
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// import viteCompression from 'vite-plugin-compression';
import createSvgIcon from './svg'

export const createVitePlugins = (isBuild = false) => {
  const vitePlugins = [vue()]
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(AutoImport({
    resolvers: [ElementPlusResolver()],
  }))
  vitePlugins.push(Components({
    resolvers: [ElementPlusResolver()],
  }))
  //gzip打包
  return vitePlugins
}
import moment from 'moment'
export const getVersion = () => { return moment().format("YYMMDDhmmss") }
