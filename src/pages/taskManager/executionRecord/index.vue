<template>
  <div>
    <card>
      <el-row class="search-row">
        <el-col class="el-col" :span="6">
          <span class="label">执行批次</span>
          <el-input v-model="queryParam.batchNo" placeholder="请输入"></el-input>
        </el-col>
        <el-col class="el-col" :span="6">
          <el-button type="primary" @click="getDataList(1)">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </card>
    <card class="grid-box">
      <el-table :data="dataList" key="id" :border="true" v-loading="loading" element-loading-text="加载中...">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="batchNo" label="执行批次" />
        <el-table-column prop="taskId" label="任务Id" />
        <el-table-column prop="taskStepId" label="任务步骤id" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="readDataStartTime" label="读取数据开始时间" width="150px" />
        <el-table-column prop="readDataEndTime" label="读取数据结束时间" width="150px" />
        <el-table-column prop="readTotalCount" label="任务步骤id" />
        <el-table-column prop="execResult" label="执行结果" />
        <el-table-column prop="execMethod" label="执行方式" />
        <el-table-column prop="createdBy" label="创建人" />
        <el-table-column prop="createdDate" label="创建时间" />
        <el-table-column prop="updatedBy" label="更新人" />
        <el-table-column prop="updatedDate" label="更新时间" />
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
import { reactive, onMounted } from 'vue';
import { deleteSingleData } from '@utils/index';
import usePageQuery from '@hooks/usePageQuery';
import { getTaskExecRecordListAPI, deleteTaskExecRecordAPI } from './api';

const queryParam = reactive({
  batchNo: '',
});
const { loading, pageVO, dataList, getDataList, currentChange, sizeChange, resetQuery } = usePageQuery(
  getTaskExecRecordListAPI,
  queryParam
);

const deleteUser = (row: any) => {
  deleteSingleData(row.id, deleteTaskExecRecordAPI).then(() => {
    getDataList();
  });
};

onMounted(() => {
  getDataList(1);
});
</script>
