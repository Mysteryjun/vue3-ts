import * as components from "@element-plus/icons-vue";
import { App } from "vue"

interface DAMNU_ENABLE {
  [key: string]: boolean, // 字段扩展声明
};
export default {
  install: (app: App) => {
    for (const name in components) {
      app.component(name, (components as any)[name])
    }
  },
};
