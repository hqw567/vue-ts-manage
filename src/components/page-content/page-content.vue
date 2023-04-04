<template>
  <div class="user-content">
    <div class="header">
      <div class="title">
        {{ contentConfig?.header?.title ?? '数据列表' }}
      </div>

      <el-button type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新增数据'
      }}</el-button>
    </div>
    <el-table :data="pageList" border style="width: 100%; text-align: center">
      <template v-for="item in contentConfig.propsList" :key="item.prop">
        <template v-if="item.type === 'timer'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              {{ formatUTC(scope.row[item.prop]) }}
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'handler'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              <el-button
                type="primary"
                @click="handleEditBtnClick(scope.row)"
                link
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
        </template>
        <template v-else-if="item.type === 'custom'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              <slot
                :name="item.slotName"
                v-bind="scope"
                :prop="item.prop"
              ></slot>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column align="center" v-bind="item"> </el-table-column>
        </template>
      </template>
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
import { computed, reactive, ref } from 'vue'

import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import useMainStore from '@/store/main/main'

const systemStore = useSystemStore()
const mainStore = useMainStore()
const currentPage = ref(1)
const pageSize = ref(10)
const newModal = ref(false)

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
  }
}
const props = defineProps<IProps>()
const pageName = props.contentConfig.pageName

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
console.log(pageList)

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
  systemStore.deletePageByIdAction(pageName, id).then((params) => {
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
