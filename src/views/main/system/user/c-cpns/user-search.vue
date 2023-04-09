<template>
  <div class="user-search">
    <el-form ref="searchFormRef" label-width="80px" :model="searchForm">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              style="width: 100%"
              placeholder="请选择状态"
            >
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              unlink-panels
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
              :shortcuts="shortcuts"
            /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div class="search-btn">
      <el-button size="large" icon="Refresh" @click="resetForm(searchFormRef)"
        >重置</el-button
      >
      <el-button
        size="large"
        icon="Search"
        type="primary"
        @click="submitForm(searchFormRef)"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const emit = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  cellphone: '',
  enable: '',
  createAt: '',
  realname: ''
})
const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  emit('resetClick')
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      // console.log(searchForm)
      emit('queryClick', searchForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
</script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 6px;
}
.el-form-item {
  padding: 8px 0;
}
.search-btn {
  display: flex;
  justify-content: end;
}
</style>
