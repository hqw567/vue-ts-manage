import hyRequest from '../index'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleIds(roleId: number) {
  return hyRequest.get({
    url: `/role/${roleId}/menu`
  })
}
