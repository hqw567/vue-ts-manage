<template>
  <div class="panel-account">
    <el-form
      ref="formRef"
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
          v-model="account.password"
          show-password
          type="password"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

import { useLoginStore } from '../../../store/login/login'
// import type { IAccount } from '../../../types'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { REMEMBER_ACCOUNT } from '../../../global/constants'
const account = reactive<IAccount>({
  name: localCache.getCache(REMEMBER_ACCOUNT)?.name ?? '',
  password: localCache.getCache(REMEMBER_ACCOUNT)?.password ?? ''
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
const loginStore = useLoginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const { name, password } = account

      console.log(name, password)
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache(REMEMBER_ACCOUNT, account)
          localCache.setCache('isRemPwd', isRemPwd)
        } else {
          localCache.removeCache(REMEMBER_ACCOUNT)
          localCache.removeCache('isRemPwd')
        }
      })
      // accountLoginRequest().then((res) => {})
    } else {
      ElMessage.error('请输入正确')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-account {
}
</style>
