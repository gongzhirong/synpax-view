import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    // 选择类型
    {
      path: '/selectType',
      name: 'selectType',
      component: () => import('./views/selectType.vue')
    },
    // 完成包装配置
    {
      path: '/finish',
      name: 'finish',
      component: () => import ('./views/finish.vue')
    },
    // 选择袋子
    {
      path: '/selectBag',
      name: 'selectBag',
      component: () => import ('./views/selectBag.vue')
    },
    // 配置袋子
    {
      path: '/configureBags',
      name: 'configureBags',
      component: () => import ('./views/configureBags.vue')
    },
    // 加入购物车
    {
      path: '/addToCar',
      name: 'addToCar',
      component: () => import ('./views/addToCar.vue')
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0}
  }
})
