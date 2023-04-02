import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainStore {
  entireRoles: any[]
  entireDepartments: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const entireRolesResult = await getEntireRoles()
      const entireDepartmentsResult = await getEntireDepartments()
      this.entireRoles = entireRolesResult.data.list
      this.entireDepartments = entireDepartmentsResult.data.list
    }
  }
})
export default useMainStore
