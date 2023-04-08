import type pageModalVue from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'

type treeFnType = (data: any) => void
type newFnType = () => void
function usePageModal(editCallback?: treeFnType, newCallback?: newFnType) {
  const modalRef = ref<InstanceType<typeof pageModalVue>>()

  function handleNewBtnClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) {
      newCallback()
    }
  }
  function handleEditBtnClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallback) {
      editCallback(itemData)
    }
  }
  return {
    modalRef,
    handleNewBtnClick,
    handleEditBtnClick
  }
}

export default usePageModal
