import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/selectType',
      name: 'selectType',
      component: () => import('./views/selectType.vue')
    },
    {
      path: '/finish',
      name: 'finish',
      component: () => import ('./views/finish.vue')
    }
  ]
})
