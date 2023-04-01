<template>
  <el-config-provider :locale="locale">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
//  import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale: any = zhCn
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
