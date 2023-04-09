<template>
  <div class="user-dialog">
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNewRef ? '新增部门' : '编辑部门'"
      width="30%"
    >
      <el-form :model="form" label-width="80px" ref="formRef">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="form.leader" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select
            v-model="form.parentId"
            placeholder="请选择上级部门"
            style="width: 100%"
          >
            <el-option
              v-for="item in entireDepartments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
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
const form = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const formRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const isNewRef = ref(true)
const mainStore = useMainStore()
const systemStore = useSystemStore()
const pageName = 'department'

const { entireDepartments } = storeToRefs(mainStore)
const emit = defineEmits(['refreshData'])
function setModalVisible(isNew = true, itemData?: any) {
  console.log(itemData)

  dialogFormVisible.value = true
  isNewRef.value = isNew
  for (const key in form) {
    form[key] = ''
  }
  if (!isNew && itemData) {
    for (const key in itemData) {
      form[key] = itemData[key]
    }
  }
}
function handleCancel() {
  dialogFormVisible.value = false
}
function handleConfirm() {
  if (isNewRef.value) {
    systemStore.newPageDataAction(pageName, form).then(() => {
      emit('refreshData')
    })
  } else {
    const editForm = form
    delete editForm.updateAt
    delete editForm.createAt
    console.log(editForm)
    systemStore.editPageDataAction(pageName, editForm.id, editForm).then(() => {
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
