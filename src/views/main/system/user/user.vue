<template>
  <div class="user">
    <div class="search">
      <user-search
        @reset-click="handleResetClick"
        @query-click="handleQueryClick"
      />
    </div>
    <div class="content">
      <user-content
        ref="contentRef"
        @new-click="handleNewBtnClick"
        @edit-click="handleEditBtnClick"
      />
    </div>
    <user-modal ref="modalRef" @refresh-data="handleResetClick" />
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleResetClick() {
  // console.log('handleResetClick :>> ', '----------------------')
  contentRef.value?.fetchUserListData()
}
function handleQueryClick(searchForm: any) {
  contentRef.value?.fetchUserListData(searchForm)
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
.user {
}
</style>
