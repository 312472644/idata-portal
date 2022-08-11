<template>
  <BaseHeader></BaseHeader>
  <main class="main-body">
    <BaseSide></BaseSide>
    <div class="page-content">
      <BaseNav></BaseNav>
      <router-view v-slot="{ Component }">
        <transition mode="in-out">
          <div>
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
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
  padding-top: $base-head-height;
  min-height: calc(100vh - $base-head-height);
}
.page-content {
  background: #f2f3f5;
  padding: $content-lr-padding;
  position: absolute;
  left: $side-width;
  top: $base-head-height;
  right: 0;
  bottom: 0;
}
</style>
