<template>
  <div class="user-content">
    <div class="header">
      <div class="title">部门列表</div>

      <el-button type="primary" @click="handleNewUserClick">新增部门</el-button>
    </div>
    <el-table :data="pageList" border style="width: 100%; text-align: center">
      <el-table-column align="center" type="selection" />
      <el-table-column align="center" prop="id" label="id" />
      <el-table-column align="center" prop="name" label="部门名称" />
      <el-table-column align="center" prop="leader" label="部门领导" />
      <el-table-column align="center" prop="parentId" label="上级部门">
        <template #default="scope">
          {{ getDepartmentsName(scope.row.parentId) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createAt" label="创建时间">
        <template #default="scope">
          {{ formatUTC(scope.row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateAt" label="更新时间">
        <template #default="scope">
          {{ formatUTC(scope.row.updateAt) }}
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
        :total="pageTotalCount"
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
import useMainStore from '@/store/main/main'

const systemStore = useSystemStore()
const mainStore = useMainStore()
const currentPage = ref(1)
const pageSize = ref(10)
// const newModal = ref(false)
const pageName = 'department'

const { entireDepartments } = storeToRefs(mainStore)
// console.log(entireDepartments.value)

const getDepartmentsName = (id: number) => {
  const currentDepartment = entireDepartments.value.find((v) => {
    return v.id === id
  })
  // console.log(currentDepartment)
  if (currentDepartment) return currentDepartment?.name
}
// console.log(getDepartmentsName(1))

const emit = defineEmits(['newClick', 'editClick'])

fetchPageListData()
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// console.log(userTotsalCount)

function handleCurrentChange() {
  // console.log(currentPage.value)
  fetchPageListData()
}
function handleSizeChange() {
  // console.log(pageSize.value)
  fetchPageListData()
}
function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(pageName, queryInfo)
}

function handleDeleteBtnClick(id: number) {
  // console.log('object :>> ', id)
  systemStore.deletePageByIdAction(pageName, id).then(() => {
    // console.log('-------')

    fetchPageListData()
  })
}

function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
function handleNewUserClick() {
  emit('newClick')
}
defineExpose({ fetchPageListData })
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
