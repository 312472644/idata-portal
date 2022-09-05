<template>
  <div>
    <card class="grid-box">
      <el-row class="search-row">
        <el-col class="el-col" :span="6">
          <span class="label">数据源名称</span>
          <el-input v-model="queryParam.dsName" placeholder="请输入"></el-input>
        </el-col>
        <el-col class="el-col" :span="6">
          <el-button type="primary" @click="getDataList(1)">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </card>
    <card class="grid-box">
      <div class="grid-operation">
        <el-button type="primary" @click="showDialog('Add')">新增</el-button>
      </div>
      <el-table :data="dataList" key="id" :border="true" v-loading="loading" element-loading-text="加载中...">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="dsName" label="数据源名称" min-width="150px" />
        <el-table-column prop="dsType" label="数据源类型" min-width="150px" />
        <el-table-column prop="dsAuthId" label="数据源认证ID" min-width="150px" />
        <el-table-column prop="status" label="状态" min-width="150px" />
        <el-table-column prop="sqlStr" label="sql语句" min-width="150px" />
        <el-table-column prop="tableName" label="表名" min-width="150px" />
        <el-table-column prop="requestAddress" label="API请求地址" min-width="150px" />
        <el-table-column prop="requestMethod" label="API请求方式" min-width="150px" />
        <el-table-column prop="requestBody" label="API请求参数" min-width="150px" />
        <el-table-column prop="requestHeader" label="API请求头" min-width="150px" />
        <el-table-column prop="connectionTimeout" label="API请求超时时长" min-width="150px" />
        <el-table-column prop="retryCount" label="API请求重试次数" min-width="150px" />
        <el-table-column prop="responseOkPath" label="响应成功路径" min-width="150px" />
        <el-table-column prop="responseOkMark" label="响应成功标识" min-width="150px" />
        <el-table-column prop="responseDataPath" label="响应数据路径" min-width="150px" />
        <el-table-column prop="paging" label="是否分页" min-width="150px" />
        <el-table-column prop="pageNoPath" label="分页路径" min-width="150px" />
        <el-table-column prop="pageSizePath" label="每页大小路径" min-width="150px" />
        <el-table-column prop="totalPath" label="总记录路径" min-width="150px" />
        <el-table-column prop="createdBy" label="创建人" min-width="150px" />
        <el-table-column prop="createdDate" label="创建时间" min-width="150px" />
        <el-table-column prop="updatedBy" label="更新人" min-width="150px" />
        <el-table-column prop="updatedDate" label="更新时间" min-width="150px" />
        <el-table-column width="80" label="操作">
          <template #default="scope">
            <div class="grid-column-operation">
              <el-link type="primary" :underline="false" @click="showDialog('Edit', scope.row)">编辑</el-link>
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
import { useRouter } from 'vue-router';
import { getDSConfigListAPI, deleteDSConfigAPI } from './api';
import usePageQuery from '@hooks/usePageQuery';
import { deleteSingleData } from '@utils/index';

const router = useRouter();
const queryParam = reactive({
  dsName: '',
});
const dialog = reactive({
  visible: false,
  openType: 'Add',
  currentRow: {},
});
const { resetQuery, getDataList, loading, dataList, pageVO, currentChange, sizeChange } = usePageQuery(
  getDSConfigListAPI,
  queryParam
);

const showDialog = (openType: string, currentRow = {} as any) => {
  dialog.openType = openType;
  dialog.visible = true;
  dialog.currentRow = { ...currentRow };
};

const deleteTask = (id: number) => {
  deleteSingleData(id, deleteDSConfigAPI).then(() => {
    getDataList();
  });
};

const toDetailPage = (id: number) => {
  router.push({
    path: '/taskManager/taskDetail',
    query: {
      id,
    },
  });
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
