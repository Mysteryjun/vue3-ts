import moment from 'moment'
import { App } from "vue";
export default function globalMoment(app: App) {
  app.config.globalProperties.$moment = moment;
  moment.locale('zh-cn') // 这里是进行了汉化 不写这句默认格式是外国的
}