<template>
  <div class="main">
    <el-container style="min-height: 100vh">
      <el-aside :width="isFold ? '64px' : '200px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container style="max-height: 100vh">
        <el-header height="50px"
          ><main-header @fold-change="handleFoldChange"
        /></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'
// const router = useRouter()

const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  // console.log(flag)
  isFold.value = flag
  // mainMenuRef.isCollapse.value = e
}
</script>

<style lang="less" scoped>
.main {
  // height: 100%;
  max-height: 100vh;
  overflow: auto;
  background-color: #f8f8f8;
}
.el-container {
  min-height: 100%;
}
.el-aside {
  transition: width 0.3s ease;
}
.el-header {
  background-color: #fff;
}
</style>
