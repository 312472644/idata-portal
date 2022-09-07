<template>
  <div class="task-detail-box">
    <card>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="任务信息" name="task">
          <task-detail :data="taskData"></task-detail>
        </el-collapse-item>
      </el-collapse>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="任务步骤" name="taskStep">
          <task-step-detail :data="taskStepData"></task-step-detail>
        </el-collapse-item>
      </el-collapse>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="字段映射" name="fieldMapping">
          <field-mapping-detail :data="fieldMappingData"></field-mapping-detail>
        </el-collapse-item>
      </el-collapse>
    </card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getFieldMappingDetailAPI, getTaskDetailAPI, getTaskStepDetailAPI } from '../createTask/api';
import taskDetail from './components/taskDetail.vue';
import taskStepDetail from './components/taskStepDetail.vue';
import fieldMappingDetail from './components/fieldMappingDetail.vue';

const route = useRoute();
const taskId = route.query.taskId;
const taskData = ref({});
const taskStepData = ref([]);
const fieldMappingData = ref([]);
const activeNames = ref('task');

const getTaskDetail = () => {
  getTaskDetailAPI(taskId as string).then(res => {
    const { data } = res.data;
    taskData.value = data;
  });
};
const getTaskStepDetail = () => {
  getTaskStepDetailAPI(taskId as string).then(res => {
    const { data = [] } = res.data;
    taskStepData.value = data;
  });
};
const getFieldMappingDetail = () => {
  getFieldMappingDetailAPI(taskId as string).then(res => {
    const { data = [] } = res.data;
    fieldMappingData.value = data;
  });
};

const init = () => {
  if (!taskId) {
    return;
  }
  getTaskDetail();
  getTaskStepDetail();
  getFieldMappingDetail();
};

onMounted(() => {
  init();
});
</script>
<style lang="scss" scoped>
.task-detail-box {
  :deep .el-collapse-item__header {
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
    background: #f2f2f2;
  }
  :deep .el-collapse-item__content {
    padding: 10px;
  }

  :deep .el-form-item {
    margin-bottom: 0;
  }
}
</style>
