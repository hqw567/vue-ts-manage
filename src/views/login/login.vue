<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  // background-image: url(https://img.simimi.cn/img/background/bg-white.png);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
