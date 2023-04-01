import { defineStore } from 'pinia'
import { postUserListData } from '@/service/main/system/system'

const useSystemStore = defineStore('system', {
  state: () => ({
    userList: [],
    userTotalCount: 0
  }),
  actions: {
    async postUserListAction() {
      const userLisResult = await postUserListData()
      // console.log(userLisResult)
      this.userList = userLisResult.data.list
      this.userTotalCount = userLisResult.data.userTotalCount
    }
  }
})

export default useSystemStore
