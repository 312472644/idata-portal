<template>
  <BaseHeader></BaseHeader>
  <section class="main-body">
    <BaseSide></BaseSide>
    <div class="page-content">
      <BaseNav></BaseNav>
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </section>
  <login-dialog />
</template>

<script setup lang="ts">
import BaseHeader from './BaseHeader.vue';
import BaseSide from './BaseSide.vue';
import BaseNav from './BaseNav.vue';
</script>
<style lang="scss" scoped>
.main-body {
  padding-top: $base-head-height;
  .base-side-container[data-collapse='true'] + .page-content {
    margin-left: 65px;
    width: calc(100% - 65px);
  }
}
.page-content {
  background: $page-content-bg-color;
  padding: $content-padding-right;
  width: calc(100% - $side-width);
  margin-left: $side-width;
  min-height: calc(100vh - $base-head-height);
  min-width: calc($min-screen-width - $side-width);
  transition: all 0.3s linear;
}
</style>
