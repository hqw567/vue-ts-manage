import type pageContentVue from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContentVue>>()
  function handleResetClick() {
    contentRef.value?.fetchPageListData({}, true)
  }
  function handleQueryClick(searchForm: any) {
    contentRef.value?.fetchPageListData(searchForm, true)
  }
  return {
    contentRef,
    handleResetClick,
    handleQueryClick
  }
}

export default usePageContent
