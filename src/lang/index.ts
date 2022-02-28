// 为了防止警告信息，直接指向到js不会提示警告信息
import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'

import enLocale from '@/locales/en'
import zhLocale from '@/locales/zh'
import twLocale from '@/locales/tw'


const messages = {
  en_US: {
    ...enLocale
  },
  zh_CN: {
    ...zhLocale
  },
  zh_TW: {
    ...twLocale
  },
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('i18n')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh_CN'
}

const i18n = createI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
