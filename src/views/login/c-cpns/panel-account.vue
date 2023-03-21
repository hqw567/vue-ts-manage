<template>
  <div class="panel-account">
    <el-form
      status-icon
      label-width="60"
      size="large"
      :model="account"
      :rules="accountRules"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          show-password
          type="password"
          v-model="account.password"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
const account = reactive({
  name: '',
  password: ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}/, message: '必须6~20位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '3位以上', trigger: 'blur' }
  ]
}

const handleLoginAction = (name: string) => {
  console.log('我处理了 :>> ', '我处理了', name, account.name, account.password)
}
defineExpose({
  handleLoginAction
})
</script>

<style lang="less" scoped>
.panel-account {
}
</style>
