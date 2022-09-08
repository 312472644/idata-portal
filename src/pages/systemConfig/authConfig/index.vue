<template>
  <div>
    <card class="grid-box">
      <el-row class="search-row">
        <el-col class="el-col" :span="6">
          <span class="label">名称</span>
          <el-input v-model="queryParam.authName" placeholder="请输入"></el-input>
        </el-col>
        <el-col class="el-col" :span="6">
          <el-button type="primary" @click="getDataList(1)">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </card>
    <card class="grid-box">
      <div class="grid-operation">
        <el-button type="primary" @click="showDialog('Add')">新增认证</el-button>
      </div>
      <el-table :data="dataList" key="id" :border="true" v-loading="loading" element-loading-text="加载中...">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="authName" label="认证名称" min-width="150px" />
        <el-table-column prop="authType" label="数据源认证类型" min-width="150px" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="connectStr" label="数据库连接串" :show-overflow-tooltip="true" min-width="150px" />
        <el-table-column prop="userName" label="用户名" min-width="150px" />
        <el-table-column prop="password" label="密码" min-width="150px" />
        <el-table-column prop="dbSchema" label="dbSchema" min-width="150px" />
        <el-table-column prop="dbVersion" label="数据库版本" min-width="150px" />
        <el-table-column prop="requestAddress" label="API请求地址" min-width="150px" :show-overflow-tooltip="true" />
        <el-table-column prop="requestMethod" label="API请求方式" min-width="150px" />
        <el-table-column prop="requestBody" label="API请求参数" min-width="150px" :show-overflow-tooltip="true" />
        <el-table-column prop="requestHeader" label="API请求头" min-width="150px" :show-overflow-tooltip="true" />
        <el-table-column prop="connectionTimeout" label="API请求超时时长" min-width="150px" />
        <el-table-column prop="retryCount" label="API请求重试次数" min-width="150px" />
        <el-table-column prop="responseOkPath" label="响应成功路径" min-width="150px" :show-overflow-tooltip="true" />
        <el-table-column prop="responseOkMark" label="响应成功标识" min-width="150px" :show-overflow-tooltip="true" />
        <el-table-column prop="responseDataPath" label="响应数据路径" min-width="150px" :show-overflow-tooltip="true" />
        <el-table-column prop="createdBy" label="创建人" min-width="150px" />
        <el-table-column prop="createdDate" label="创建时间" min-width="150px" />
        <el-table-column prop="updatedBy" label="更新人" min-width="150px" />
        <el-table-column prop="updatedDate" label="更新时间" min-width="150px" />
        <el-table-column width="80" label="操作" fixed="right">
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
    <auth-config-dialog
      v-model:visible="dialog.visible"
      :open-type="dialog.openType"
      :current-row="dialog.currentRow"
      @submit-success="getDataList(1)"
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { getDsAuthListAPI, deleteDsAuthAPI } from './api';
import usePageQuery from '@hooks/usePageQuery';
import { deleteSingleData } from '@utils/index';
import authConfigDialog from './components/authConfigDialog.vue';

const queryParam = reactive({
  authName: ''
});
const dialog = reactive({
  visible: false,
  openType: 'Add',
  currentRow: {}
});
const { resetQuery, getDataList, loading, dataList, pageVO, currentChange, sizeChange } = usePageQuery(
  getDsAuthListAPI,
  queryParam
);

const showDialog = (openType: string, currentRow = {} as any) => {
  dialog.openType = openType;
  dialog.visible = true;
  dialog.currentRow = { ...currentRow };
};

const deleteTask = (id: number) => {
  deleteSingleData(id, deleteDsAuthAPI).then(() => {
    getDataList();
  });
};

onMounted(() => {
  getDataList();
});
</script>
<style lang="scss" scoped></style>
