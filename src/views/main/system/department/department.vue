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
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const mainStore = useMainStore()

const { entireDepartments } = storeToRefs(mainStore)
const getDepartmentsName = (id: number) => {
  const currentDepartment = entireDepartments.value.find((v) => {
    return v.id === id
  })
  if (currentDepartment) return currentDepartment?.name
}
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
modalConfigAddParentOptions()

const { contentRef, handleResetClick, handleQueryClick } = usePageContent()

const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal()
</script>

<style scoped>
.department {
}
</style>
