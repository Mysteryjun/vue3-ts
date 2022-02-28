import { permission } from './permission'
import { App } from "vue";
// 在mainjs挂载
export default function directive(app: App) {
  app.directive('permission', permission)
}