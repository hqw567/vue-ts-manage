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
import { mapMenusToRoutes, mapUserMenuToPermissions } from '@/utils/map-menus'
import useMainStore from '../main/main'

export const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    userPermissions: []
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
      this.userPermissions = mapUserMenuToPermissions(this.userMenus)

      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', this.userMenus)

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      const routes = mapMenusToRoutes(this.userMenus)

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
        this.userPermissions = mapUserMenuToPermissions(this.userMenus)

        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      } else {
        router.push('/login')
      }
    }
  }
})
