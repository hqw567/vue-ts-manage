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

export const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
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

      router.push('/main')
    }
  }
})
