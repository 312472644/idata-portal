<template>
  <div>
    <card class="grid-box">
      <el-row class="search-row">
        <el-col class="el-col" :span="6">
          <span class="label">任务名</span>
          <el-input v-model="queryParam.taskName" placeholder="请输入"></el-input>
        </el-col>
        <el-col class="el-col" :span="6">
          <el-button type="primary" @click="getDataList(1)">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </card>
    <card class="grid-box">
      <div class="grid-operation">
        <el-button type="primary" @click="createTask" v-permission="['admin']">创建任务</el-button>
      </div>
      <el-table :data="dataList" key="id" :border="true" v-loading="loading" element-loading-text="加载中...">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="taskName" label="任务名" width="100px">
          <template #default="scope">
            <el-link
              type="primary"
              class="overflow"
              :title="scope.row.taskName"
              :underline="false"
              @click="toDetailPage(scope.row.id)"
            >
              {{ scope.row.taskName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" />
        <el-table-column prop="executePlan" label="执行计划" :show-overflow-tooltip="true" />
        <el-table-column prop="startReadDataTime" label="开始读取数据时间" width="150px" />
        <el-table-column prop="timeStampField" label="时间戳字段" />
        <el-table-column prop="localStorage" label="是否本地存储">
          <template #default="scope">
            {{ scope.row.localStorage === 'Y' ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="storageTime" label="本地存储时长" />
        <el-table-column prop="lastExecuteNo" label="最后执行批次" />
        <el-table-column prop="lastExecuteTime" label="最后执行时间" />
        <el-table-column prop="createdBy" label="创建人" />
        <el-table-column prop="createdDate" label="创建时间" width="140px" />
        <el-table-column prop="updatedBy" label="更新人" />
        <el-table-column prop="updatedDate" label="更新时间" width="140px" />
        <el-table-column width="80" label="操作">
          <template #default="scope">
            <div class="grid-column-operation">
              <el-link type="primary" :underline="false" @click="editTask(scope.row.id)">编辑</el-link>
              <el-link type="danger" :underline="false" @click="deleteTask(scope.row.id)">删除</el-link>
            </div>
          </template>
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
import { onMounted, reactive } from 'vue';
import { LocationQueryRaw, useRouter } from 'vue-router';
import { getTaskListAPI, deleteTaskAPI } from './api';
import usePageQuery from '@hooks/usePageQuery';
import { deleteSingleData } from '@utils/index';

const router = useRouter();
const queryParam = reactive({
  taskName: ''
});
const { resetQuery, getDataList, loading, dataList, pageVO, currentChange, sizeChange } = usePageQuery(
  getTaskListAPI,
  queryParam
);

const deleteTask = (id: number) => {
  deleteSingleData(id, deleteTaskAPI).then(() => {
    getDataList();
  });
};

const toDetailPage = (taskId: number) => {
  router.push({
    path: '/taskManager/taskDetail',
    query: { taskId }
  });
};

const toCreateTaskPage = (query: LocationQueryRaw) => {
  router.push({
    path: '/taskManager/createTask',
    query
  });
};

const createTask = () => {
  toCreateTaskPage({ active: 1 });
};

const editTask = (taskId: string) => {
  toCreateTaskPage({ active: 1, taskId, operationType: 'Edit' });
};

onMounted(() => {
  getDataList();
});
</script>
<style lang="scss" scoped>
.overflow {
  white-space: nowrap;
  :deep .el-link__inner {
    display: inline-block;
    max-width: 90px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
