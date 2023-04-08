<template>
  <div class="line-echarts">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'
interface IProps {
  dataAxis: string[]
  data: number[]
}
const props = defineProps<IProps>()
const option: EChartsOption = {
  title: {
    text: '商品销量前10',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: props.dataAxis
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      data: props.data,
      type: 'line',
      smooth: true
    }
  ]
}
</script>

<style lang="less" scoped>
.line-echarts {
}
</style>
