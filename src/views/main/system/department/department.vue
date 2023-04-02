<template>
  <div class="department">
    <page-search
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    />
    <page-modal ref="modalRef" @refresh-data="handleResetClick" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpns/page-search.vue'
import pageModal from './c-cpns/page-modal.vue'
import pageContent from './c-cpns/page-content.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof pageContent>>()
const modalRef = ref<InstanceType<typeof pageModal>>()
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
</script>

<style scoped>
.department {
}
</style>
