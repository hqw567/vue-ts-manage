<template>
  <div class="user-dialog">
    <el-dialog
      v-model="dialogFormVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
    >
      <el-form ref="formRef" :model="form" label-width="100px">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item v-bind="item">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="form[item.prop]"
                :placeholder="item.placeholder"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="form[item.prop]"
                :placeholder="item.placeholder"
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
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName" v-bind="item"></slot>
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
// import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
// import { storeToRefs } from 'pinia'
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
  otherInfo?: any
}
const props = defineProps<IProps>()
const initialForm: any = { id: null }

for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = ''
}
const form = reactive<any>(initialForm)

const formRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const isNewRef = ref(true)
// const mainStore = useMainStore()

const systemStore = useSystemStore()
const pageName = ref(props.modalConfig.pageName)
const editData = ref()
// const { entireRoles, entireDepartments } = storeToRefs(mainStore)
const emit = defineEmits(['refreshData'])
function setModalVisible(isNew = true, itemData?: any) {
  // console.log(itemData)

  dialogFormVisible.value = true
  isNewRef.value = isNew
  for (const key in form) {
    form[key] = ''
  }
  if (!isNew && itemData) {
    // console.log(itemData)

    for (const key in form) {
      form[key] = itemData[key]
    }
    editData.value = itemData
    // console.log(itemData)
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
  let allData = form

  if (props.otherInfo) {
    allData = { ...form, ...props.otherInfo }
  }
  delete allData.updateAt
  delete allData.createAt
  if (isNewRef.value) {
    systemStore.newPageDataAction(pageName, allData).then(() => {
      emit('refreshData')
    })
  } else {
    // console.log(form)

    // console.log(editForm, 'editForm')
    systemStore.editPageDataAction(pageName, allData.id, allData).then(() => {
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
