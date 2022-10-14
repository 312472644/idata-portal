<template>
  <card class="grid-box">
    <task-relation-table></task-relation-table>
  </card>
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
