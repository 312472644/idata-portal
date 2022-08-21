<template>
  <card>
    <el-row class="search-row">
      <el-col class="el-col" :span="6">
        <span class="label">权限名称</span>
        <el-input v-model="query.permissionName" placeholder="请输入"></el-input>
      </el-col>
      <el-col class="el-col" :span="6">
        <span class="label">角色名称</span>
        <el-input v-model="query.roleName" placeholder="请输入"></el-input>
      </el-col>
      <el-col class="el-col" :span="6">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </card>
</template>
<script lang="ts" setup>
import { reactive, defineEmits } from 'vue';
import { IQuery } from '../interface';

const query = reactive<IQuery>({
  permissionName: '',
  roleName: '',
  pageIndex: 1,
  pageSize: 20,
});

const emits = defineEmits(['search']);

const search = () => {
  emits('search', query);
};

const reset = () => {
  query.permissionName = '';
  query.roleName = '';
  emits('search', query);
};
</script>
