<template>
  <div>任务监控</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { getTaskMonitorListAPI } from './api';

const getTaskMonitorList = () => {
  getTaskMonitorListAPI({ condition: {} }).then(res => {});
};

onMounted(() => {
  getTaskMonitorList();
});
</script>
<style lang="scss" scoped></style>
