<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
const echartsRef = ref<HTMLElement>()

interface IProps {
  option: EChartsOption
  registerMap?: {
    name: string
    data: object
  }
}
const props = defineProps<IProps>()
let myChart: any
onMounted(() => {
  myChart = echarts.init(echartsRef.value!, 'light', {
    renderer: 'canvas'
  })

  if (props.registerMap) {
    echarts.registerMap(props.registerMap.name, props.registerMap.data as any)
  }
  if (props.option) {
    myChart.setOption(props.option)
  }
  // console.log(myChart)

  // console.log(props.option)
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})
watch(
  () => props.option,
  () => {
    myChart.setOption(props.option, true)
  }
)
onUnmounted(() => {
  window.removeEventListener('resize', function () {
    myChart.resize()
  })
})
</script>

<style lang="less" scoped>
.base-echarts {
}
.echarts {
  height: 500px;
}
</style>
