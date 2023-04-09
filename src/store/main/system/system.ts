import { defineStore } from 'pinia'
import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData
} from '@/service/main/system/system'
import { ElNotification } from 'element-plus'

const useSystemStore = defineStore('system', {
  state: () => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUserListData(queryInfo)
      this.userList = userListResult.data.list
      this.userTotalCount = userListResult.data.totalCount
    },
    async deleteUserByIdAction(userId: number) {
      await deleteUserById(userId)
    },
    async newUserDataAction(userInfo: any) {
      const userResult = await newUserData(userInfo)
      if (userResult.code === 0) {
        ElNotification({
          title: 'Success',
          message: userResult.data,
          type: 'success'
        })
      } else {
        ElNotification({
          title: 'Error',
          message: userResult.data,
          type: 'error'
        })
      }
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editUserDataResult = await editUserData(id, userInfo)
      console.log(editUserDataResult)
      if (editUserDataResult.code === 0) {
        ElNotification({
          title: 'Success',
          message: editUserDataResult.data,
          type: 'success'
        })
      } else {
        ElNotification({
          title: 'Error',
          message: editUserDataResult.data,
          type: 'error'
        })
      }
    },
    async postPageListAction(pageName: any, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      this.pageList = pageListResult.data.list
      this.pageTotalCount = pageListResult.data.totalCount
    },
    async deletePageByIdAction(pageName: any, userId: number) {
      const deleteResult = await deletePageById(pageName, userId)
      console.log(deleteResult)
    },
    async newPageDataAction(pageName: any, userInfo: any) {
      const pageResult = await newPageData(pageName, userInfo)
      if (pageResult.code === 0) {
        ElNotification({
          title: 'Success',
          message: pageResult.data,
          type: 'success'
        })
      } else {
        ElNotification({
          title: 'Error',
          message: pageResult.data,
          type: 'error'
        })
      }
    },
    async editPageDataAction(pageName: any, id: number, userInfo: any) {
      const editPageDataResult = await editPageData(pageName, id, userInfo)
      console.log(editPageDataResult)
      if (editPageDataResult.code === 0) {
        ElNotification({
          title: 'Success',
          message: editPageDataResult.data,
          type: 'success'
        })
      } else {
        ElNotification({
          title: 'Error',
          message: editPageDataResult.data,
          type: 'error'
        })
      }
    }
  }
})

export default useSystemStore
