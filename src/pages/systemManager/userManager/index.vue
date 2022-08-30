<template>
  <div>
    <card>
      <el-row class="search-row">
        <el-col class="el-col" :span="6">
          <span class="label">用户名</span>
          <el-input v-model="queryParam.userName" placeholder="请输入"></el-input>
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
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="secretKey" label="密钥" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="failTimes" label="失败次数" />
        <el-table-column prop="createdBy" label="创建人" />
        <el-table-column prop="createdDate" label="创建时间" />
        <el-table-column width="120">
          <template #default="scope">
            <div class="grid-column-operation">
              <el-link type="primary" :underline="false" @click="showDialog(scope.row)">编辑</el-link>
              <el-link type="danger" :underline="false" @click="deleteUser(scope.row)">删除</el-link>
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
    <!--用户编辑弹框-->
    <user-dialog v-model:visible="visible" :current-row="currentRow" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { confirmMessageBox, deleteSingleData } from '@utils/index';
import { usePageQuery } from '@hooks/index';
import { ElMessage } from 'element-plus';
import { IUser } from './interface';
import { getUserListAPI, deleteUserAPI } from './api';

import userDialog from './components/userDialog.vue';

const visible = ref(false);
const currentRow = ref<IUser>({} as IUser);
const queryParam = reactive({
  userName: '',
});
const { loading, pageVO, dataList, getDataList, currentChange, sizeChange, resetQuery } = usePageQuery<IUser>(
  getUserListAPI,
  queryParam
);

const deleteUser = (row: IUser) => {
  deleteSingleData(row.id, deleteUserAPI, `确认删除用户：${row.userName}?`).then(() => {
    getDataList();
  });
};

const showDialog = (row: IUser) => {
  visible.value = true;
  currentRow.value = row;
};

onMounted(() => {
  getDataList(1);
});
</script>
