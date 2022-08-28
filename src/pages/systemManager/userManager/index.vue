<template>
  <div>
    <card>
      <el-row class="search-row">
        <el-col class="el-col" :span="6">
          <span class="label">用户名</span>
          <el-input v-model="query.search.userName" placeholder="请输入"></el-input>
        </el-col>
        <el-col class="el-col" :span="6">
          <el-button type="primary" @click="getUserList(1)">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </card>
    <card class="grid-box">
      <el-table
        :data="userList"
        :border="true"
        v-loading="loading"
        element-loading-text="加载中..."
        style="width: 100%"
      >
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
              <el-link type="primary" :underline="false" @click="showDialog">编辑</el-link>
              <el-link type="danger" :underline="false" @click="deleteUser(scope.row)">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination layout="total, sizes, prev, pager, next" small background :total="pageVO.total" />
      </div>
    </card>
    <!--用户编辑弹框-->
    <user-dialog v-model:visible="visible" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import userDialog from './components/userDialog.vue';
import { ElMessage } from 'element-plus';
import { IPagination, IQuery } from '@interface/index';
import { IUser, IUserQuery } from './interface';
import { getUserListAPI, deleteUserAPI } from './api';
import { confirmMessageBox } from '@utils/index';

const visible = ref(false);
const loading = ref(false);
const userList = ref<IUser[]>([]);
const pageVO = reactive<IPagination>({
  pageNumber: 1,
  pageSize: 10,
  total: 0,
});
const query = reactive<IQuery<IUserQuery>>({
  search: {
    userName: '',
  },
  page: {
    pageNumber: pageVO.pageNumber,
    pageSize: pageVO.pageSize,
  },
});

const deleteUser = (row: IUser) => {
  confirmMessageBox(`确认删除用户：${row.userName}？`).then(() => {
    deleteUserAPI(row.id).then(res => {
      const { code, success } = res.data;
      if (code === 200 && success) {
        ElMessage.success({
          message: '删除成功！',
        });
      }
    });
  });
};

const showDialog = () => {
  visible.value = true;
};

const getUserList = (pageNumber?: number) => {
  loading.value = true;
  pageVO.pageNumber = pageNumber || pageVO.pageNumber;
  getUserListAPI(query)
    .then(res => {
      const { data } = res.data;
      userList.value = data.list;
      pageVO.total = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
};

const resetQuery = () => {
  query.search.userName = '';
  pageVO.pageNumber = 1;
  getUserList(1);
};

onMounted(() => {
  getUserList();
});
</script>
