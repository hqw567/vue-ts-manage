<template>
  <div class="pie-echarts">
    <BaseEcharts :option="option"></BaseEcharts>
  </div>
</template>

<script setup lang="ts">
import BaseEcharts from '..'
import type { EChartsOption } from 'echarts'
import type { IEchartsValueType } from '../types'
import { computed } from 'vue'
interface IProps {
  pieData: IEchartsValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: '商品分类个数',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '当前分类总个数',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pie-echarts {
}
</style>
