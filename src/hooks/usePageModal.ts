import type pageModalVue from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof pageModalVue>>()

  function handleNewBtnClick() {
    modalRef.value?.setModalVisible()
  }
  function handleEditBtnClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
  }
  return {
    modalRef,
    handleNewBtnClick,
    handleEditBtnClick
  }
}

export default usePageModal
