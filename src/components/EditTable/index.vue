<template>
  <div class="edit-table-box">
    <el-table class="edit-table" border :data="tableData" max-height="300" style="width: 100%">
      <el-table-column prop="propName" label="参数名">
        <template #default="scope">
          <el-input v-model="scope.row.propName" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="propValue" label="参数值">
        <template #default="scope">
          <el-input v-model="scope.row.propValue" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <div class="grid-column-operation">
            <el-link type="primary" :underline="false" @click="addRow">新增</el-link>
            <el-link
              type="danger"
              :underline="false"
              :disabled="tableData.length === 1"
              @click="deleteRow(scope.$index)"
            >
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { reactive, defineExpose, watch } from 'vue';

const props = defineProps(['tableList']);

const tableData = reactive([{ propName: '', propValue: '' }]);

const addRow = () => {
  tableData.push({ propName: '', propValue: '' });
};

const deleteRow = rowIndex => {
  tableData.splice(rowIndex, 1);
};

const reset = () => {
  tableData.length = 0;
  tableData.push({ propName: '', propValue: '' });
};

const getTableList = () => {
  return tableData.filter(item => item.propName);
};

const checkIsValid = () => {
  return tableData.some(item => item.propName);
};

watch(
  props.tableList,
  (value: []) => {
    tableData.length = 0;
    tableData.push(...value);
  },
  { deep: true }
);

defineExpose({
  checkIsValid,
  getTableList,
  reset
});
</script>
<style lang="scss" scoped>
.edit-table-box {
  width: 100%;
  .edit-table {
    :deep .el-table__header .el-table__cell {
      background: #fff;
    }

    :deep .el-table__header .el-table__cell .cell {
      color: #1818196b;
      font-weight: normal;
    }
  }
}
</style>
