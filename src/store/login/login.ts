import { defineStore } from 'pinia'
import { accountLoginRequest } from '../../service/login/index'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const LOGIN_TOKEN = 'login/token'

export const useLoginStore = defineStore('login', {
  state: () => ({
    name: '',
    id: '',
    token: localCache.getCache(LOGIN_TOKEN)
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      console.log(loginResult)

      this.name = loginResult.data.name
      this.id = loginResult.data.id
      this.token = loginResult.data.token

      localCache.setCache(LOGIN_TOKEN, this.token)
    }
  }
})
