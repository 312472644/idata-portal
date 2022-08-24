<template>
  <div>
    <search @search="searchHandle" />
    <grid ref="gridRef" />
  </div>
</template>
<script lang="ts" setup>
import search from './components/search.vue';
import grid from './components/grid.vue';
import { IQuery } from './interface';
import { ref } from 'vue';

const gridRef = ref<any>(null);
const searchHandle = (query: IQuery) => {
  console.log('query', query.permissionName);
  console.log('grid', gridRef.value.getGridList());
};
</script>
<style lang="scss" scoped></style>
