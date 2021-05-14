import { createRouter, createWebHistory } from 'vue-router'
import { setI18nLanguage, loadLocaleMessages, SUPPORT_LOCALES } from './lang'

import type { Router, RouteRecordRaw } from 'vue-router'
import type { I18n, Composer } from 'vue-i18n'

export function setupRouter(i18n: I18n): Router {
  const locale: string =
    i18n.mode === 'legacy'
      ? i18n.global.locale
      : ((i18n.global as unknown) as Composer).locale.value

  // setup routes
  const routes: RouteRecordRaw[] = [
    { path: '/:locale/' , name: 'home', component: () => import('./views/Home/index.vue')},
    // { path: '/:locale/selectType', name: 'selectType', component: () => import('./views/selectType.vue') },
    // { path: '/:locale/finish', name: 'finish', component: () => import('./views/finish.vue') },
    // { path: '/:locale/selectBag', name: 'selectBag', component: () => import('./views/selectBag.vue') },
    // { path: '/:locale/configureBags', name: 'configureBags', component: () => import('./views/configureBags.vue') },
    // { path: '/:locale/configureMembrane', name: 'configureMembrane', component: () => import('./views/configureMembrane.vue') },
    // { path: '/:locale/addToCar', name: 'addToCar', component: () => import('./views/addToCar.vue') },
    { path: '/:locale/personalCenter', name: 'personalCenter', component: () => import('./views/PersonalCenter/index.vue') },
    { path: '/:locale/packagingInitial/:packageId', name: 'packagingInitial', component: () => import('./views/PackagingInitial/index.vue') },
    { path: '/:locale/ConfigurePackage', name: 'ConfigurePackage', component: () => import('./views/ConfigurePackage/index.vue') },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => `/${locale}`
    }
  ]

  // create router instance
  const router = createRouter({
    history: createWebHistory(),
    scrollBehavior () {
      return { top: 0 }
    },
    routes
  })

  // navigation guards
  router.beforeEach(async to => {
    const paramsLocale = to.params.locale as string

    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return `/${locale}`
    }

    // load locale messages
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale)
    }

    // set i18n language
    setI18nLanguage(i18n, paramsLocale)
  })

  return router
}
