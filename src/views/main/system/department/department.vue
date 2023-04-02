<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    >
      <template #parentId="scope">
        {{ getDepartmentsName(scope.row[scope.prop]) }}
      </template>
    </page-content>
    <page-modal
      ref="modalRef"
      @refresh-data="handleResetClick"
      :modal-config="modalConfig"
    >
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import pageContent from '@/components/page-content/page-content.vue'
import { ref, computed } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
const contentRef = ref<InstanceType<typeof pageContent>>()
const modalRef = ref<InstanceType<typeof pageModal>>()
// import { storeToRefs } from 'pinia'
// import useMainStore from '@/store/main/main'
const mainStore = useMainStore()
// console.log(mainStore, 'useMainStore()')

// console.log(mainStore)

const { entireDepartments } = storeToRefs(mainStore)
// console.log(modalConfig.formItems)

function modalConfigAddParentOptions() {
  const departmentsMap = mainStore.entireDepartments.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })
  const options: any = []
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      options.push(...departmentsMap)
    }
  })

  const parentIndex = modalConfig.formItems.findIndex(
    (item) => item.prop === 'parentId'
  )
  modalConfig.formItems[parentIndex].options = options
  return modalConfig
}
// modalConfigRef()
modalConfigAddParentOptions()
function ss() {
  console.log('sss')
}
ss()
function handleResetClick() {
  // console.log('handleResetClick :>> ', '----------------------')
  contentRef.value?.fetchPageListData()
}
function handleQueryClick(searchForm: any) {
  contentRef.value?.fetchPageListData(searchForm)
  // console.log('handleQueryClick :>> ', searchForm)
}
function handleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
function handleEditBtnClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}

const getDepartmentsName = (id: number) => {
  const currentDepartment = entireDepartments.value.find((v) => {
    return v.id === id
  })
  // console.log(currentDepartment)
  if (currentDepartment) return currentDepartment?.name
}
</script>

<style scoped>
.department {
}
</style>
