// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

// 为 store state 声明类型
interface State {
  name: string
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    name: "张三"
  },
  getters: {
    getName: (state) => {
      return state.name
    }
  },
  mutations: {
    SET_NAME(state, name) {
      state.name = name
    }
  }
})

export function useStore() {
  return baseUseStore(key)
}