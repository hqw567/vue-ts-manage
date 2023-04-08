<template>
  <div class="rose-echarts">
    <baseEcharts :option="option"></baseEcharts>
  </div>
</template>

<script setup lang="ts">
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'

import type { IEchartsValueType } from '../types'
interface IProps {
  roseData: IEchartsValueType[]
}
const props = defineProps<IProps>()
const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: '商品分类销量',
      left: 'center'
    },
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '当前分类销量',
        type: 'pie',
        radius: [20, 130],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.rose-echarts {
}
</style>
