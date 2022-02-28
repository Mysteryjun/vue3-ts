import { defineStore } from 'pinia'
import { pinia } from '@/pinia'
import { getInfo } from '@/api/user'

interface AppState {
  userId: any,
  userName: string,
  userLoginType: number,
  permissions: Array<string>
}

export const useAppStore = defineStore({
  id: 'user',
  state: (): AppState => ({
    userId: "",
    userName: "",
    userLoginType: 0,
    permissions: []
  }),
  getters: {

  },
  actions: {
    setUser() {
      getInfo().then(res => {
        this.userId = res.CurrentUser.userId;
        this.userName = res.CurrentUser.userName;
        this.userLoginType = res.CurrentUser.userLoginType;
        this.permissions = res.currentUserPower;
      })
    }
  }
})

// 这里的pinia即为通过createPinia()生成并在入口处传递给app实例的pinia实例，在此手动注入，并暴露
export function userStoreHook() {
  return useAppStore(pinia)
}