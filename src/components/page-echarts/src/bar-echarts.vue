<template>
  <div class="bar-echarts">
    <BaseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEcharts from './base-echarts.vue'
import * as echarts from 'echarts'

interface IProps {
  dataAxis: string[]
  data: number[]
}
const props = defineProps<IProps>()

const option: any = {
  title: {
    text: '商品分类收藏数',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    data: props.dataAxis,
    axisLabel: {
      inside: true,
      color: 'white'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: props.data
    }
  ]
}
</script>

<style lang="less" scoped>
.bar-echarts {
}
</style>
