<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <pageContent
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    ></pageContent>
    <pageModal
      ref="modalRef"
      @refresh-data="handleResetClick"
      :modal-config="modalConfig"
      :other-info="otherInfo"
    >
      <template #tree>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="defaultProps"
          @check="handleElTreeCheck"
        />
      </template>
    </pageModal>
  </div>
</template>

<script setup lang="ts" name="role">
import pageSearch from '@/components/page-search/page-search.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import pageContent from '@/components/page-content/page-content.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { mapMenuListToIds } from '@/utils/map-menus'
import { nextTick, ref } from 'vue'
import { ElTree } from 'element-plus'

import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
const { contentRef, handleResetClick, handleQueryClick } = usePageContent()
const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal(
  editCallBack,
  newCallback
)

const mainStore = useMainStore()
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'name'
}

const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  // console.log(data1, data2)

  const selectData = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(selectData)
  otherInfo.value = { menuList: selectData }
}

function editCallBack(itemData: any) {
  // console.log(itemData.menuList)
  const allId = mapMenuListToIds(itemData.menuList)
  console.log(allId)

  nextTick(() => {
    treeRef.value?.setCheckedKeys(allId)
  })
}
function newCallback() {
  console.log('-----')

  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>

<style scoped>
.role {
}
</style>
