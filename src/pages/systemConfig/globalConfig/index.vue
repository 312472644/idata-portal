<template>
  <div class="global-config">
    <card>
      <el-row class="search-row">
        <el-col class="el-col" :span="6">
          <span class="label">编码Code</span>
          <el-input v-model="query.code" placeholder="请输入"></el-input>
        </el-col>
        <el-col class="el-col" :span="6">
          <el-button type="primary" @click="getDicList(1)">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </card>
    <card class="grid-box">
      <el-table :data="dicList" key="id" :border="true" v-loading="loading" element-loading-text="加载中...">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="code" label="编码" />
        <el-table-column prop="codeCn" label="中文名称" />
        <el-table-column prop="codeEn" label="英文名称" />
        <el-table-column prop="configType" label="配置类型" />
        <el-table-column prop="fieldName" label="字段名称" />
        <el-table-column prop="createdBy" label="创建人" />
        <el-table-column prop="createdDate" label="创建时间" />
        <el-table-column width="120">
          <!-- <template #default="scope">
            <div class="grid-column-operation">
              <el-link type="primary" :underline="false" @click="showDialog(scope.row)">编辑</el-link>
              <el-link type="danger" :underline="false" @click="deleteUser(scope.row)">删除</el-link>
            </div>
          </template> -->
        </el-table-column>
      </el-table>
    </card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getDicListAPI } from './api';
import { IDicConfig } from './interface';

const query = reactive({
  code: '',
});
const dicList = ref<IDicConfig[]>([]);
const loading = ref(false);

const resetQuery = () => {
  console.log('query', query);
};

const getDicList = (pageNumber: number) => {
  console.log('query', pageNumber);
};

onMounted(() => {
  loading.value = true;
  getDicListAPI({
    condition: {},
    page: {
      pageSize: 1,
      pageNumber: 10,
    },
  })
    .then(res => {
      const { data } = res.data;
      dicList.value = data.list;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
<style lang="scss" scoped>
.global-config {
}
</style>
