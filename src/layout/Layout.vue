<template>
  <BaseHeader></BaseHeader>
  <main class="main-body">
    <BaseSide></BaseSide>
    <div class="page-content">
      <BaseNav></BaseNav>
      <Transition mode="out-in">
        <router-view />
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import BaseHeader from './BaseHeader.vue';
import BaseSide from './BaseSide.vue';
import BaseNav from './BaseNav.vue';
</script>
<style lang="scss" scoped>
.main-body {
  display: flex;
  min-height: calc(100vh - $base-head-height);
}
.page-content {
  height: inherit;
  background: #f2f3f5;
  padding: $content-lr-padding;
  width: calc(100% - $side-width);
}
</style>
