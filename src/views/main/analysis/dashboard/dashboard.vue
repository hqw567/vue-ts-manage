<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col v-for="item in amountList" :key="item.amount" :span="6">
        <count-card v-bind="item"></count-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8">
        <echarts-card>
          <PieEcharts :pie-data="showGoodsCategoryCount"></PieEcharts>
        </echarts-card>
      </el-col>
      <el-col :span="8">
        <echarts-card>
          <mapEcharts :map-data="showGoodsAddressSale" />
        </echarts-card>
      </el-col>
      <el-col :span="8">
        <echarts-card>
          <roseEcharts :rose-data="showGoodsCategorySale" />
        </echarts-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <echarts-card>
          <barEcharts v-bind="showGoodsCategoryFavor"></barEcharts>
        </echarts-card>
      </el-col>
      <el-col :span="12">
        <echarts-card>
          <LineEcharts v-bind="showGoodsSaleTop10" />
        </echarts-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import countCard from './c-cpns/count-card/count-card.vue'
import echartsCard from './c-cpns/echarts-card/echarts-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import {
  LineEcharts,
  PieEcharts,
  roseEcharts,
  mapEcharts,
  barEcharts
} from '@/components/page-echarts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const analysisStore = useAnalysisStore()
analysisStore.fetchAmountListData()

const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsAddressSale,
  goodsCategoryFavor,
  goodsSaleTop10
} = storeToRefs(analysisStore)
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})

const showGoodsCategorySale = computed(() => {
  return goodsCategorySale.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address + '市',
    value: item.count
  }))
})

const showGoodsCategoryFavor = computed(() => {
  const dataAxis = goodsCategoryFavor.value.map((item) => item.name)
  const data = goodsCategoryFavor.value.map((item) => item.goodsFavor ?? 0)
  return { dataAxis, data }
})

const showGoodsSaleTop10 = computed(() => {
  const dataAxis = goodsSaleTop10.value.map((item) =>
    item.name.length > 5 ? item.name.slice(0, 6) + '...' : item.name
  )
  const data = goodsSaleTop10.value.map((item) => item.saleCount ?? 0)
  return { dataAxis, data }
})
</script>

<style lang="less" scoped>
.dashboard {
}
</style>
