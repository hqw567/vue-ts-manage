<template>
  <div class="main-menu">
    <div class="logo">
      <img src="https://simimi.cn/favicon.svg" alt="" />
      <h1 v-show="!isFold">后台管理系统</h1>
    </div>
    <el-menu
      router
      :default-active="routePath"
      class="el-menu-vertical-demo"
      :collapse="isFold"
    >
      <el-sub-menu :index="item.url" v-for="item in userMenus" :key="item.id">
        <template #title>
          <el-icon>
            <component :is="item.icon.split('icon-')[1]"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group v-for="sub in item.children" :key="sub.id">
          <el-menu-item :index="sub.url">{{ sub.name }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store/login/login'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
// import { ref } from 'vue'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
// const router = router()
const route = useRoute()
// console.log(route, route.path)

const routePath = ref<string>()

watch(
  () => route.path,
  (newPath, oldPath) => {
    // route.path 发生了改变
    routePath.value = newPath
    // console.log('Route path changed from', oldPath, 'to', newPath)
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.main-menu {
  background-color: #fff;
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #ccc;
  --el-menu-active-color {
    color: #fff;
  }
}
.el-menu {
  border-right: 0;
  .el-menu-item {
    padding-left: 58px !important;
  }
}

.logo {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #000;
  & > img {
    width: 40px;
    height: 40px;
  }
  h1 {
    font-weight: 700;
    margin-left: 5px;
  }
}
</style>
