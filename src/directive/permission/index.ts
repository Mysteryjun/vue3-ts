/*
* 自定义指令控制权限
*/
import { userStoreHook } from '@/pinia/modules/user';
const store = userStoreHook()
import { Directive } from "vue";
import type { DirectiveBinding } from "vue";
export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const permissions = store.permissions;
    // console.log(value);
    // console.log("permissions", permissions);
    if (permissions.indexOf(value) == -1) {//无权限不显示
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
