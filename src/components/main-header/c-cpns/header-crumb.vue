<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.url">
        <el-breadcrumb-item :to="{ path: item.url }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLoginStore } from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => mapPathToBreadcrumbs(route.path, userMenus))
// console.log(breadcrumbs)
</script>

<style lang="less" scoped>
.crumb {
}
</style>
