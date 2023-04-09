<template>
  <div class="menu">
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
    </page-content>
    <page-modal
      ref="modalRef"
      :modal-config="modalConfig"
      @refresh-data="handleResetClick"
    >
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="menu">
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

console.log()
</script>

<style scoped>
.menu {
}
</style>
