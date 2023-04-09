<template>
  <div class="count-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="card-h-t">
            <span>{{ title }}</span>
            <el-tooltip :content="tips" placement="top" effect="light">
              <el-icon><Warning /></el-icon>
            </el-tooltip>
          </div>
          <div ref="count1Ref" class="c-count">{{ number1 }}</div>
        </div>
      </template>
      <div class="footer">
        <span>{{ subtitle }}</span>
        <span ref="count2Ref" class="b-count">{{ number2 }}</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CountUp } from 'countup.js'
interface IProps {
  title: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
  amount: string
}
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '商品总销量',
  number1: 3333,
  number2: 33333,
  subtitle: '商品总销量'
})

const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
const countOption = {
  prefix: props.amount === 'saleroom' ? '￥' : ''
}
onMounted(() => {
  if (count1Ref.value && count2Ref.value) {
    const countup1 = new CountUp(count1Ref.value, props.number1, countOption)
    const countup2 = new CountUp(count2Ref.value, props.number2, countOption)
    countup1.start()
    countup2.start()
  }
})
</script>

<style lang="less" scoped>
.count-card {
}
.box-card {
  font-size: 14px;
  .card-h-t {
    display: flex;
    justify-content: space-between;
    align-items: top;
    .el-icon {
      cursor: pointer;
    }
  }
  .c-count {
    margin-top: 10px;
    font-size: 20px;
  }
  .b-count {
    margin-left: 5px;
  }
}
</style>
