import elementEnLocale from 'element-plus/es/locale/lang/en' // element-plus lang
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn'// element-plus lang
import elementTWLocale from 'element-plus/es/locale/lang/zh-tw'// element-plus lang

import { getLanguage } from "./index.js"

let epLang;
if (getLanguage() == "zh_CN") {
  epLang = elementZhLocale;
} else if (getLanguage() == "zh_TW") {
  epLang = elementTWLocale;
} else {
  epLang = elementEnLocale;
}
// console.log(epLang);
export default epLang;