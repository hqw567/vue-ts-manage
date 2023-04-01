import type { ILoginState } from './../../types/login'
import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleIds
} from '../../service/login/index'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '../../router/index'

import { LOGIN_TOKEN } from '@/global/constants'
import type { RouteRecordRaw } from 'vue-router'
import { mapMenusToRoutes } from '@/utils/map-menus'

export const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)

      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      const userMenusResult = await getUserMenusByRoleIds(userInfo.role.id)
      this.userMenus = userMenusResult.data

      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', this.userMenus)
      // console.log(this.userMenus)

      // console.log(files, 'files')

      // for (const key in files) {
      //   const module: any = files[key]
      //   this.userMenus.forEach((v) => {
      //     if (v.children) {
      //       v.children.forEach((sub) => {
      //         if (sub.url.includes(module.default.path)) {
      //           router.addRoute('main', module.default)
      //         }
      //       })
      //     }
      //   })
      // }

      // console.log(router, 'router')

      const routes = mapMenusToRoutes(this.userMenus)
      // console.log(routes)

      routes.forEach((route) => router.addRoute('main', route))

      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      } else {
        router.push('/login')
      }
      // console.log(routes)
    }
  }
})
