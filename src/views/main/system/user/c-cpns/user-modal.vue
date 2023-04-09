<template>
  <div class="user-dialog">
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNewRef ? '新增用户' : '编辑用户'"
      width="30%"
    >
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="form.realname"
            autocomplete="off"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
        <el-form-item v-if="isNewRef" label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="form.cellphone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="form.roleId" style="width: 100%">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="form.departmentId" style="width: 100%">
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
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
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const formRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const isNewRef = ref(true)
const mainStore = useMainStore()
const systemStore = useSystemStore()
// const entireRolesData = mainStore.entireRoles
// console.log(entireRolesData)

// const entireDepartmentsData = mainStore.entireDepartments

const { entireRoles, entireDepartments } = storeToRefs(mainStore)
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
  // formRef.resetFields()
  // if (!formEl) return
  // formEl.resetFields()
  dialogFormVisible.value = false
}
function handleConfirm() {
  // console.log(form)
  if (isNewRef.value) {
    systemStore.newUserDataAction(form).then(() => {
      emit('refreshData')
    })
  } else {
    // console.log(form.id)
    const editForm = form
    delete editForm.updateAt
    delete editForm.createAt
    delete editForm.password
    console.log(editForm)
    systemStore.editUserDataAction(editForm.id, editForm).then(() => {
      emit('refreshData')
    })
  }

  dialogFormVisible.value = false
  // if (!formEl) return
  // formEl.resetFields()
}
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.user-dialog {
  padding: 20px;
}
</style>
