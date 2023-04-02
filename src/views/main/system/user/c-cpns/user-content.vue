<template>
  <div class="user-content">
    <div class="header">
      <div class="title">用户列表</div>

      <el-button type="primary">新增用户</el-button>
    </div>
    <el-table :data="userList" border style="width: 100%; text-align: center">
      <el-table-column align="center" type="selection" />
      <el-table-column align="center" type="index" label="序号" />
      <el-table-column align="center" prop="name" label="用户名" />
      <el-table-column align="center" prop="realname" label="真实姓名" />
      <el-table-column align="center" prop="cellphone" label="手机号" />
      <el-table-column align="center" prop="enable" label="启用状态">
        <template #default="scope">
          <el-button color="#626aef" plain>{{
            scope ? '启用' : '禁用'
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createAt" label="创建时间" />
      <el-table-column align="center" prop="updateAt" label="更新时间" />
      <el-table-column align="center" label="操作">
        <el-button type="primary" link>编辑</el-button>
        <el-button link type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

const systemStore = useSystemStore()
systemStore.postUserListAction()

const { userList } = storeToRefs(systemStore)
console.log('userList :>> ', userList)
</script>

<style lang="less" scoped>
.user-content {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 6px;
  margin-top: 20px;
}
.header {
  margin-bottom: 10px;
  .title {
    font-weight: 700;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: end;
}
</style>
