<template>
  <div class="task-relation-table">
    <el-table :data="dataList.stepList" default-expand-all :border="true" row-class-name="rowClass">
      <el-table-column type="expand">
        <template #default="props">
          <div class="relation-children-table">
            <div class="title">字段映射</div>
            <el-table :data="props.row.fieldMappingList" key="id" :border="true">
              <el-table-column prop="sourceFieldName" label="源字段名称">
                <template #default="scope">
                  <el-input v-if="!isView" v-model="scope.row.sourceFieldName" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sourceFieldType" label="源字段类型">
                <template #default="scope">
                  <el-input v-if="!isView" v-model="scope.row.sourceFieldType" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sourceFieldLength" label="源字段长度">
                <template #default="scope">
                  <el-input v-if="!isView" v-model="scope.row.sourceFieldLength" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="targetFieldType" label="目标字段类型">
                <template #default="scope">
                  <el-input v-if="!isView" v-model="scope.row.targetFieldType" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="targetFieldName" label="目标字段名称">
                <template #default="scope">
                  <el-input v-if="!isView" v-model="scope.row.targetFieldName" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="targetFieldLength" label="目标字段长度">
                <template #default="scope">
                  <el-input v-if="!isView" v-model="scope.row.targetFieldLength" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="seqNo" label="序号">
                <template #default="scope">
                  <el-input v-if="!isView" v-model="scope.row.seqNo" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="changeData" label="转换数据">
                <template #default="scope">
                  <el-select
                    v-if="!isView"
                    class="select-full-width"
                    v-model="scope.row.changeData"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in updateDataOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="changeRule" label="转换规则">
                <template #default="scope">
                  <el-input
                    v-if="scope.row.changeData === 'Y' && !isView"
                    v-model="scope.row.changeRule"
                    placeholder="请输入"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column width="130">
                <template #default="scope">
                  <div class="grid-column-operation" v-if="!isView">
                    <el-link type="primary" :underline="false" @click="addFieldMapping(props.row)">
                      新增字段映射
                    </el-link>
                    <el-popover
                      :visible="deleteRow.type === 'fieldMapping' && deleteRow.rowIndex === scope.$index"
                      placement="top"
                      :width="160"
                    >
                      <p>确认删除?</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="small" text @click="cancelDelete">取消</el-button>
                        <el-button size="small" type="primary" @click="deleteFieldMapping(props.row, scope.$index)">
                          确认
                        </el-button>
                      </div>
                      <template #reference>
                        <el-link
                          type="danger"
                          :underline="false"
                          :disabled="props.row.fieldMappingList.length === 1"
                          @click="confirmDelete(scope.$index, 'fieldMapping')"
                        >
                          删除
                        </el-link>
                      </template>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="stepName" label="步骤名称">
        <template #default="scope">
          <el-input v-if="!isView" v-model="scope.row.stepName" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="stepSeq" label="步骤序号">
        <template #default="scope">
          <el-input v-if="!isView" v-model="scope.row.stepSeq" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="sourceDsId" label="源数据源类型">
        <template #default="scope">
          <el-select v-if="!isView" class="select-full-width" v-model="scope.row.sourceDsId" placeholder="请选择">
            <el-option v-for="item in sourceDsTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="startReadDataTime" label="开始读取数据时间">
        <template #default="scope">
          <el-date-picker
            v-if="!isView"
            v-model="scope.row.startReadDataTime"
            class="date-picker"
            type="date"
            placeholder="请选择"
            value-format="YYYY-MM-DD"
          />
        </template>
      </el-table-column>
      <el-table-column prop="timeStampField" label="时间戳字段">
        <template #default="scope">
          <el-input v-if="!isView" v-model="scope.row.timeStampField" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="targetDsId" label="目标数据源类型">
        <template #default="scope">
          <el-select v-if="!isView" class="select-full-width" v-model="scope.row.targetDsId" placeholder="请选择">
            <el-option v-for="item in targetDsTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="updateData" label="更新数据">
        <template #default="scope">
          <el-select v-if="!isView" class="select-full-width" v-model="scope.row.updateData" placeholder="请选择">
            <el-option v-for="item in updateDataOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="updateKey" label="更新key">
        <template #default="scope">
          <el-input
            v-if="scope.row.updateData === 'Y' && !isView"
            v-model="scope.row.updateKey"
            placeholder="请输入"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template #default="scope">
          <div class="grid-column-operation" v-if="!isView">
            <el-link type="primary" :underline="false" @click="addTaskStep">新增任务步骤</el-link>
            <el-popover
              :visible="deleteRow.type === 'step' && deleteRow.rowIndex === scope.$index"
              placement="top"
              :width="160"
            >
              <p>确认删除?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="small" text @click="cancelDelete">取消</el-button>
                <el-button size="small" type="primary" @click="deleteTaskStep(scope.row, scope.$index)">确认</el-button>
              </div>
              <template #reference>
                <el-link
                  type="danger"
                  :underline="false"
                  :disabled="dataList.stepList.length === 1"
                  @click="confirmDelete(scope.$index, 'step')"
                >
                  删除
                </el-link>
              </template>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { reactive, ref } from 'vue';

const props = defineProps(['isView']);
const fieldMappingTemplate = {
  sourceFieldName: '',
  sourceFieldType: '',
  sourceFieldLength: '',
  targetFieldType: '',
  targetFieldName: '',
  targetFieldLength: '',
  seqNo: '',
  changeData: '',
  changeRule: ''
};
const templateRow = {
  stepName: '',
  stepSeq: '',
  sourceDsId: '',
  startReadDataTime: '',
  timeStampField: '',
  targetDsId: '',
  updateData: 'Y',
  updateKey: '',
  fieldMappingList: [fieldMappingTemplate]
};
const deleteRow = ref({ type: '', rowIndex: 0 });
const dataList = reactive({
  stepList: [_.cloneDeep(templateRow)]
});
const sourceDsTypeOptions = reactive([
  { label: '1', value: '1' },
  { label: '2', value: '2' }
]);
const targetDsTypeOptions = reactive([
  { label: '1', value: '1' },
  { label: '2', value: '2' }
]);
const updateDataOptions = reactive([
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' }
]);

const addTaskStep = () => {
  const copyRow = _.cloneDeep(templateRow);
  dataList.stepList.push(_.cloneDeep(copyRow));
};

const cancelDelete = () => {
  deleteRow.value.type = '';
  deleteRow.value.rowIndex = 0;
};

const confirmDelete = (rowIndex, type) => {
  deleteRow.value.type = type;
  deleteRow.value.rowIndex = rowIndex;
};

const deleteTaskStep = (row, rowIndex) => {
  dataList.stepList.splice(rowIndex, 1);
  cancelDelete();
};

const addFieldMapping = row => {
  row.fieldMappingList.push(_.cloneDeep(fieldMappingTemplate));
};

const deleteFieldMapping = (row, rowIndex) => {
  row.fieldMappingList.splice(rowIndex, 1);
  cancelDelete();
};
</script>
<style lang="scss" scoped>
.task-relation-table {
  :deep .el-table__header .el-table__cell {
    background: #fff;
  }

  :deep .el-table__header .el-table__cell .cell {
    color: #1818196b;
    font-weight: normal;
  }

  :deep .el-table__header .el-table__cell,
  :deep .el-table.el-table--border .el-table__cell {
    border-right: 1px solid #ebeef5 !important;
  }

  :deep .rowClass {
    background: #f5f7fa;
  }

  .relation-children-table {
    padding: 10px 15px;
    .title {
      font-size: 14px;
      font-weight: bold;
      padding-bottom: 10px;
    }
  }
}
</style>
