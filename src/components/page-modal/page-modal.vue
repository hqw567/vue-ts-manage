<template>
  <div class="user-dialog">
    <el-dialog
      v-model="dialogFormVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
    >
      <el-form :model="form" label-width="80px" ref="formRef">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item v-bind="item">
            <template v-if="item.type === 'input'">
              <el-input
                :placeholder="item.placeholder"
                v-model="form[item.prop]"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                v-model="form[item.prop]"
                style="width: 100%"
              >
                <el-option
                  v-for="sub in item.options"
                  :key="sub.id"
                  :label="sub.label"
                  :value="sub.value"
                />
              </el-select>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel()">关闭</el-button>
          <el-button type="primary" @click="handleConfirm()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import type { FormInstance } from 'element-plus'

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const initialForm: any = {}

for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = ''
}
const form = reactive<any>(initialForm)

const formRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const isNewRef = ref(true)
const mainStore = useMainStore()

const systemStore = useSystemStore()
const pageName = props.modalConfig.pageName
const editData = ref()
// const { entireRoles, entireDepartments } = storeToRefs(mainStore)
const emit = defineEmits(['refreshData'])
function setModalVisible(isNew: boolean = true, itemData?: any) {
  // console.log(itemData)

  dialogFormVisible.value = true
  isNewRef.value = isNew
  for (const key in form) {
    form[key] = ''
  }
  if (!isNew && itemData) {
    for (const key in form) {
      form[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in form) {
      form[key] = ''
    }
    editData.value = null
  }
}
function handleCancel() {
  dialogFormVisible.value = false
}
function handleConfirm() {
  if (isNewRef.value) {
    systemStore.newPageDataAction(pageName, form).then((params) => {
      emit('refreshData')
    })
  } else {
    const editForm = form
    delete editForm.updateAt
    delete editForm.createAt
    console.log(editForm)
    systemStore
      .editPageDataAction(pageName, editForm.id, editForm)
      .then((params) => {
        emit('refreshData')
      })
  }

  dialogFormVisible.value = false
}
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.user-dialog {
  padding: 20px;
}
</style>
