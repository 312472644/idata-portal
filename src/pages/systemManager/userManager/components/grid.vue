<template>
  <card class="grid-box">
    <div class="grid-operation">
      <el-button type="primary" :icon="Plus" @click="showDialog">新增</el-button>
      <el-button type="danger" :icon="Delete">删除</el-button>
    </div>
    <el-table :data="tableData" :border="true" v-loading="loading" element-loading-text="加载中..." style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
      <el-table-column width="120">
        <template #default="scope">
          <div class="grid-column-operation">
            <el-link type="primary" :underline="false">编辑</el-link>
            <el-link type="danger" :underline="false" @click="handleDelete(scope.row)">删除</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination small background layout="prev, pager, next" :total="tableData.length" />
    </div>
    <permission-dialog v-model:visible="visible" />
  </card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import service from '@service/index';
import { Plus, Delete } from '@element-plus/icons-vue';
import permissionDialog from './permissionDialog.vue';

defineProps({
  list: [],
  query: Object,
});

const visible = ref(false);
const loading = ref(false);

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

const handleDelete = (row: any) => {
  console.log('row', row);
};

const showDialog = () => {
  visible.value = true;
};

const getGridList = () => {
  service.get('http://120.79.230.22:20112/diBus/test/1').then(res => {
    console.log('res', res);
  });
};

onMounted(() => {
  getGridList();
});

defineExpose({
  getGridList,
});
</script>
