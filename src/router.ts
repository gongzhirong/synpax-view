import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    { path: '/:pathMatch(.*)*', redirect: '/home' },
    { path: '/home' , name: 'home', component: () => import('./views/Home.vue')},
    { path: '/selectType', name: 'selectType', component: () => import('./views/selectType.vue') },
    { path: '/finish', name: 'finish', component: () => import('./views/finish.vue') },
    { path: '/selectBag', name: 'selectBag', component: () => import('./views/selectBag.vue') },
    { path: '/configureBags', name: 'configureBags', component: () => import('./views/configureBags.vue') },
    { path: '/configureMembrane', name: 'configureMembrane', component: () => import('./views/configureMembrane.vue') },
    { path: '/addToCar', name: 'addToCar', component: () => import('./views/addToCar.vue') }
]

const webHistory = createWebHashHistory();

const router = createRouter({
    history: webHistory,
    routes
})

export default router