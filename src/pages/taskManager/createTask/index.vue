<template>
  <div class="create-task">
    <card>
      <el-steps :space="200" :active="activeStep" simple finish-status="success">
        <el-step title="创建任务" @click.native="stepClick(1)" />
        <el-step title="创建任务步骤" @click.native="stepClick(2)" />
        <el-step title="创建字段映射" @click.native="stepClick(3)" />
      </el-steps>
    </card>
    <!--创建任务-->
    <create-task v-if="activeStep === 1"></create-task>
    <!--创建任务步骤-->
    <create-task-step v-if="activeStep === 2"></create-task-step>
    <!--创建字段映射-->
    <create-field-mapping v-if="activeStep === 3"></create-field-mapping>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import createTask from './components/createTask.vue';
import createTaskStep from './components/createTaskStep.vue';
import createFieldMapping from './components/createFieldMapping.vue';

const route = useRoute();
const router = useRouter();
const activeStep = ref(1);

const setActiveStep = () => {
  const active = typeof route.query.active === 'string' ? parseInt(route.query.active) : 1;
  activeStep.value = active;
};

const stepClick = (active: number) => {
  if (route.query.operationType !== 'Edit') {
    return;
  }
  router.push({
    path: '/taskManager/createTask',
    query: {
      ...route.query,
      active
    }
  });
};

watch(route, newValue => {
  setActiveStep();
});

onMounted(() => {
  setActiveStep();
});
</script>
<style lang="scss" scoped>
.create-task {
  :deep .el-step {
    cursor: pointer;
  }
}
</style>
