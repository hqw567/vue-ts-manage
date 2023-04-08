<template>
  <div class="map-echarts">
    <BaseEcharts :option="option" :registerMap="registerMap"></BaseEcharts>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEcharts from './base-echarts.vue'
import type { IEchartsValueType } from '../types'
import chinaJson from '../data/china.json'
interface IProps {
  mapData: IEchartsValueType[]
}

const registerMap = {
  name: 'china',
  data: chinaJson
}
const props = defineProps<IProps>()

const option: any = {
  title: {
    text: '全国销量分布情况',
    top: '10px',
    left: 'center',
    textStyle: {
      color: 'black'
    }
  },

  tooltip: {
    formatter: function (params: any) {
      return (
        params.seriesName +
        '<br />' +
        params.name +
        '：' +
        (params.value ? params.value : 0)
      )
    }, //数据格式化
    showDelay: 0,
    transitionDuration: 0.2
  },
  visualMap: {
    min: 0,
    max: 2000,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'], //取值范围的文字
    textStyle: {
      color: 'white'
    },
    inRange: {
      color: ['#eeeeee', '#f86d3f'] //取值范围的颜色
    },
    show: true //图注
  },
  geo: {
    map: 'china',
    roam: true, //开启缩放和平移
    zoom: 1.23, //视角缩放比例
    label: {
      normal: {
        show: true,
        fontSize: '10',
        color: 'rgba(0,0,0,0.7)'
      }
    },
    itemStyle: {
      normal: {
        // borderColor: 'rgba(0, 0, 0, 0.2)',
        // areaColor: 'rgba(0,60,153,0.8)',
        borderColor: '#f86d3f'
      },
      emphasis: {
        areaColor: '#f86d3f', //鼠标选择区域颜色
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        borderWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  series: [
    {
      name: '当前地区销量',
      type: 'map',
      geoIndex: 0,
      data: props.mapData
    }
  ]
}
</script>

<style lang="less" scoped>
.map-echarts {
}
</style>
