import type pageContentVue from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContentVue>>()
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }
  function handleQueryClick(searchForm: any) {
    contentRef.value?.fetchPageListData(searchForm)
  }
  return {
    contentRef,
    handleResetClick,
    handleQueryClick
  }
}

export default usePageContent
