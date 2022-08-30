<template>
  <div>
    <!-- <card></card> -->
    <card class="grid-box">
      <el-table :data="dataList" key="id" :border="true" v-loading="loading" element-loading-text="加载中...">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="taskId" label="任务Id" />
        <el-table-column prop="batchNo" label="执行批次" />
        <el-table-column prop="taskStepId" label="步骤任务Id" />
        <el-table-column prop="inParam" label="输入参数" :show-overflow-tooltip="true" />
        <el-table-column prop="outData" label="输出内容" :show-overflow-tooltip="true" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="lastExecuteNo" label="最后执行批次" />
        <el-table-column prop="lastExecuteTime" label="最后执行时间" />
        <el-table-column prop="createdDate" label="创建时间" />
        <el-table-column width="120">
          <!-- <template #default="scope">
            <div class="grid-column-operation">
              <el-link type="primary" :underline="false" @click="showDialog('Edit', scope.row)">编辑</el-link>
              <el-link type="danger" :underline="false" @click="deleteDic(scope.row.id)">删除</el-link>
            </div>
          </template> -->
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next"
          background
          :currentPage="pageVO.pageNumber"
          :page-size="pageVO.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pageVO.total"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </div>
    </card>
  </div>
</template>
<script lang="ts" setup>
import { getDispatchLogListAPI } from './api';
import usePageQuery from '@hooks/usePageQuery';
import { onMounted } from 'vue';

const { resetQuery, getDataList, loading, dataList, pageVO, currentChange, sizeChange } = usePageQuery(
  getDispatchLogListAPI,
  {}
);

onMounted(() => {
  getDataList();
});
</script>
<style lang="scss" scoped></style>
