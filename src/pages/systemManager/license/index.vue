<template>
  <div>
    <card class="grid-box">
      <el-row class="search-row">
        <el-col class="el-col" :span="6">
          <span class="label">license</span>
          <el-input v-model="queryParam.license" placeholder="请输入"></el-input>
        </el-col>
        <el-col class="el-col" :span="6">
          <el-button type="primary" @click="getDataList(1)">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </card>
    <card class="grid-box">
      <card class="grid-box">
        <div class="grid-operation">
          <el-button type="primary" @click="showDialog('Add')">新增License</el-button>
        </div>
        <el-table :data="dataList" key="id" :border="true" v-loading="loading" element-loading-text="加载中...">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="license" label="license" />
          <el-table-column prop="hostInfo" label="主机信息" :show-overflow-tooltip="true" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="effDate" label="受影响时间" />
          <el-table-column width="80">
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
    </card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { getLicenseListAPI, deleteLicenseAPI } from './api';
import usePageQuery from '@hooks/usePageQuery';
import { deleteSingleData } from '@utils/index';

const queryParam = reactive({
  license: '',
});
const dialog = reactive({
  visible: false,
  openType: 'Add',
  currentRow: {},
});
const { resetQuery, getDataList, loading, dataList, pageVO, currentChange, sizeChange } = usePageQuery(
  getLicenseListAPI,
  queryParam
);

const showDialog = (openType: string, currentRow = {} as any) => {
  dialog.openType = openType;
  dialog.visible = true;
  dialog.currentRow = { ...currentRow };
};

const deleteTask = (id: number) => {
  deleteSingleData(id, deleteLicenseAPI).then(() => {
    getDataList();
  });
};

onMounted(() => {
  getDataList();
});
</script>
<style lang="scss" scoped></style>
