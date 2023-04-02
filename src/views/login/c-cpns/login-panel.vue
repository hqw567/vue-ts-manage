<template>
  <div class="login-panel">
    <h1 class="title">后台登录系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" stretch type="border-card">
        <el-tab-pane name="account" label="账号登录">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <div><panel-account ref="accountRef" /></div>
        </el-tab-pane>
        <el-tab-pane name="phone" label="手机登录">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <div>
            <panel-phone />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="control">
      <el-checkbox v-model="isRemPwd" label="记住密码"></el-checkbox>
      <el-button link>忘记密码</el-button>
    </div>

    <el-button
      @click="handleLoginBtnClick"
      type="primary"
      size="large"
      class="login-btn"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'
import { localCache } from '@/utils/cache'
const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)

const accountRef = ref<InstanceType<typeof PanelAccount>>()

const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  .title {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }
  .control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
