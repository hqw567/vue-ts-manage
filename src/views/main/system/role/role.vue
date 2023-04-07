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
    >
      <template #tree>213213</template>
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

const { contentRef, handleResetClick, handleQueryClick } = usePageContent()
const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal()
</script>

<style scoped>
.role {
}
</style>
