<template>
  <div class="main-header">
    <div class="header-left">
      <div class="Fold" @click="handleMenuIconClick()">
        <el-icon>
          <component :is="isFold ? 'Fold' : 'Expand'"></component>
        </el-icon>
      </div>
      <header-crumb />
    </div>

    <div class="header-right">
      <div class="">
        <el-dropdown>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click="handleExitClicks"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { localCache } from '@/utils/cache'
import { ref } from 'vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'

const emit = defineEmits(['foldChange'])
const isFold = ref(false)
function handleMenuIconClick() {
  console.log('我点击了')
  isFold.value = !isFold.value

  emit('foldChange', isFold.value)
}
function handleExitClicks() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.header-left {
  display: flex;
  height: 100%;
  align-items: center;
  .Fold {
    cursor: pointer;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    // font-size: 30px;
    svg,
    i {
      width: 100%;
      height: 100%;
    }
  }
}
.el-dropdown {
  cursor: pointer;
}
</style>
