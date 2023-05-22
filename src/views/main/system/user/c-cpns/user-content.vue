<template>
  <div class="user-content">
    <div class="header">
      <div class="title">用户列表</div>

      <el-button type="primary" @click="handleNewUserClick">新增用户</el-button>
    </div>
    <el-table :data="userList" border style="width: 100%; text-align: center">
      <el-table-column align="center" type="selection" />
      <el-table-column align="center" prop="id" label="id" />
      <el-table-column align="center" prop="name" label="用户名" />
      <el-table-column align="center" prop="realname" label="真实姓名" />
      <el-table-column align="center" prop="cellphone" label="手机号" />
      <el-table-column align="center" prop="enable" label="启用状态">
        <template #default="scope">
          <el-button color="#626aef" plain>{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template #default="scope">
          {{ formatUTC(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updated_at" label="更新时间">
        <template #default="scope">
          {{ formatUTC(scope.row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="handleEditBtnClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            @click="handleDeleteBtnClick(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'

const systemStore = useSystemStore()

const currentPage = ref(1)
const pageSize = ref(10)
// const newModal = ref(false)
const emit = defineEmits(['newClick', 'editClick'])

fetchUserListData()
const { userList, userTotalCount } = storeToRefs(systemStore)
// console.log(userTotsalCount)

function handleCurrentChange() {
  // console.log(currentPage.value)
  fetchUserListData()
}
function handleSizeChange() {
  // console.log(pageSize.value)
  fetchUserListData()
}
function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUserListAction(queryInfo)
}

function handleDeleteBtnClick(id: number) {
  // console.log('object :>> ', id)
  systemStore.deleteUserByIdAction(id).then(() => {
    // console.log('-------')

    fetchUserListData()
  })
}

function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
function handleNewUserClick() {
  emit('newClick')
}
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.user-content {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 6px;
  margin-top: 20px;
}
.header {
  margin-bottom: 10px;
  .title {
    font-weight: 700;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: end;
}
</style>
