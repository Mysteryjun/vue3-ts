import { defineStore } from 'pinia'
import { pinia } from '@/pinia'
import { getLanguage } from '@/lang/index'
import { getWs_prefix } from "@/api/user"

interface AppState {
  language: string,
  ws_prefix: any
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    language: getLanguage(),
    ws_prefix: ""
  }),
  getters: {

  },
  actions: {
    setLanguage(language: string) {
      this.language = language;
    },
    async setWsPrefix() {
      try {
        const res = await getWs_prefix()
        console.log(res);
        const prefix = res.prefix ? res.prefix : 'ws://localhost:9980/websocket/'
        this.ws_prefix = prefix;
      } catch (err) {
        console.log(`err`, err)
      }

    }
  }
})

// 这里的pinia即为通过createPinia()生成并在入口处传递给app实例的pinia实例，在此手动注入，并暴露
export function appStoreHook() {
  return useAppStore(pinia)
}