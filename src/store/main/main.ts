import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainStore {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const entireRolesResult = await getEntireRoles()
      const entireDepartmentsResult = await getEntireDepartments()
      const entireMenuResult = await getEntireMenus()
      this.entireRoles = entireRolesResult.data.list
      this.entireDepartments = entireDepartmentsResult.data.list
      this.entireMenus = entireMenuResult.data.list
    }
  }
})
export default useMainStore
