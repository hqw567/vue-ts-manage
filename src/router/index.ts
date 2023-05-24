import { firstMenu } from './../utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const routes = [
  {
    path: '/',
    redirect: 'main'
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  // const isMainPath = to.path.startsWith('/main')
  if (to.path === '/main/' && !token) {
    return '/login'
  }

  if (to.path === '/main/') {
    return firstMenu?.url
  }
})

export default router
