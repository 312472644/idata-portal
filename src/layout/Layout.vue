<template>
  <BaseHeader></BaseHeader>
  <main class="main-body">
    <BaseSide></BaseSide>
    <el-scrollbar>
      <div class="page-content">
        <BaseNav></BaseNav>
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </div>
    </el-scrollbar>
  </main>
</template>

<script setup lang="ts">
import BaseHeader from './BaseHeader.vue';
import BaseSide from './BaseSide.vue';
import BaseNav from './BaseNav.vue';
</script>
<style lang="scss" scoped>
.main-body {
  padding-top: $base-head-height;
  min-height: calc(100vh - $base-head-height);
}
.page-content {
  background: #f2f3f5;
  padding: $content-lr-padding;
  width: calc(100% - $side-width);
  margin-left: $side-width;
  min-height: calc(100vh - $base-head-height);
  min-width: calc($min-screen-width - $side-width);
}
</style>
