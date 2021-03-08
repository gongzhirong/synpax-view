import { createI18n } from 'vue-i18n'

import enUs from './en-us'
import zhCN from './zh-cn'

const i18n = createI18n({
    locale: window.localStorage.getItem('lang') || 'zh-cn', // 默认
    messages: {
        'zh-cn': zhCN,
        'en-us': enUs
    }
})

export {
    i18n
}